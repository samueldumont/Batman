import React from 'react'
import { DatePicker, Form, Input, Cascader, Button, Spin } from 'antd'
import axios from 'axios'
import moment from 'moment'
import { Redirect } from 'react-router-dom'

import Layout from '../../components/layout'
import 'antd/dist/antd.css'
import '../../styles/global.css'

import Map from '../../components/MapContainer'

const habitats = [
  {
    value: 'Cavité - carrière, mine et grotte',
    label: 'Cavité - carrière, mine et grotte'
  },
  {
    value: 'Bâtiments',
    label: 'Bâtiments'
  },
  {
    value: "Plan d'eau - mare",
    label: "Plan d'eau - mare",
    children: [
      {
        value: '< 50m²',
        label: '< 50m²'
      },
      {
        value: '> 50m²',
        label: '> 50m²'
      }
    ]
  },
  {
    value: "Cours d'eau",
    label: "Cours d'eau",
    children: [
      {
        value: 'fleuves et gd rivières (L >10 m)',
        label: 'fleuves et gd rivières (L >10 m)'
      },
      { value: 'ruisseau (L < 3m)', label: 'ruisseau (L < 3m)' },
      { value: 'rivière (3m< L< 10m)', label: 'rivière (3m< L< 10m)' }
    ]
  },
  { value: 'Milieux rocheux', label: 'Milieux rocheux' },
  { value: 'Forêt feuillue', label: 'Forêt feuillue' },
  { value: 'Forêt résineuse', label: 'Forêt résineuse' },
  { value: 'Forêt mixte', label: 'Forêt mixte' },
  { value: 'Mise à blanc', label: 'Mise à blanc' }
]

const primaryVegetation = [
  {
    value: "Bande boisée et alignement d'arbres",
    label: "Bande boisée et alignement d'arbres"
  },
  { value: 'Haie', label: 'Haie' },
  { value: 'Arbre isolé', label: 'Arbre isolé' },
  { value: 'buissons isolés', label: 'buissons isolés' }
]

const weather = [
  {
    value: 'nuit calme',
    label: 'nuit calme'
  },
  { value: 'nuit pluvieuse', label: 'nuit pluvieuse' },
  { value: 'nuit orageuse', label: 'nuit orageuse' }
]

const maintenance = [
  {
    value: 'Eau - présence de végétation aquatique flottante',
    label: 'Eau - présence de végétation aquatique flottante'
  },
  {
    value: 'Forêt',
    label: 'Forêt',
    children: [
      {
        value: 'peuplement jeune ( < 50 cm diam)',
        label: 'peuplement jeune ( < 50 cm diam)'
      },
      {
        value: 'peuplement avec gros bois ( > 50 cm diam)',
        label: 'peuplement avec gros bois ( > 50 cm diam)'
      }
    ]
  },
  {
    value: 'Prairie',
    label: 'Prairie',
    children: [
      {
        value: 'site pâturé (avec animaux présents)',
        label: 'site pâturé (avec animaux présents)'
      },
      { value: 'site fauché (récemment)', label: 'site fauché (récemment)' },
      { value: 'site non fauché', label: 'site non fauché' }
    ]
  }
]

const secondaryVegetation = [
  {
    value: 'Layons forestier',
    label: 'Layons forestier'
  },
  {
    value: 'Route (induré, circulation véhicule rapide)',
    label: 'Route (induré, circulation véhicule rapide)'
  },
  {
    value: 'Chemin (induré, circulation véhicule lents)',
    label: 'Chemin (induré, circulation véhicule lents)'
  },
  {
    value: 'Sentier (non induré - circulation piétonne)',
    label: 'Sentier (non induré - circulation piétonne)'
  },
  { value: 'Autre', label: 'Autre' }
]

const yesno = [{ value: 'yes', label: 'yes' }, { value: 'no', label: 'no' }]

const arrayReducer = array => {
  return array.join(' - ')
}

class BatRegistrationSubmissionForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
      sighting: {
        comment: '',
        deviceNumber: '',
        endDate: '',
        habitatType: '',
        height: '',
        id: '',
        isIlluminated: '',
        locationCoordinates: { lat: 50.606962, lng: 3.511842 },
        locationName: '',
        maintenanceType: '',
        microphoneNumber: '',
        observationAmount: '',
        observations: [],
        operatorName: '',
        primaryStructuringElementType: '',
        secondaryStructuringElementType: '',
        startDate: '',
        weatherType: ''
      }
    }
  }

  async componentDidMount() {
    this.setState({ isLoading: true })

    // 1. Take id-parameter from the URL
    const hashValue = window.location.hash.split('#')
    const id = hashValue[hashValue.length - 1]

    // // 2. GET request to check for and prefill data
    try {
      const backendData = await axios.get(
        `http://batman-backend-hitw.westeurope.azurecontainer.io/releves/${id}`
      )

      console.log(backendData)
      const {
        startDate,
        endDate,
        observationAmount,
        locationCoordinates
      } = backendData.data
      this.setState({
        sighting: {
          ...this.state.sighting,
          startDate: moment(startDate),
          endDate,
          id,
          observationAmount,
          locationCoordinates: {
            lat: locationCoordinates.lat || this.state.sighting.locationCoordinates.lat,
            lng: locationCoordinates.lng || this.state.sighting.locationCoordinates.lng
          }
        },
        isLoading: false
      })

    } catch (e) {
      // display some error message
      this.setState({ isLoading: false })
      console.log(e)
    }
  }

  handleSubmit = async e => {
    let sighting = {}
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.form.validateFields((err, fieldsValue) => {
          if (err) {
            return
          }

          // format values before submit
          sighting = {
            comment: fieldsValue.comment,
            locationName: fieldsValue.locationName,
            microphoneNumber: fieldsValue.microphoneNumber,
            observationAmount: this.state.sighting.observationAmount,
            endDate: this.state.sighting.endDate,
            operatorName: fieldsValue.operatorName,
            deviceNumber: fieldsValue.deviceNumber,
            height: Number(fieldsValue.height),
            startDate: fieldsValue['startDate'].format('YYYYMMDD'),
            habitatType: arrayReducer(fieldsValue.habitatType),
            isIlluminated: arrayReducer(fieldsValue.isIlluminated),
            maintenanceType: arrayReducer(fieldsValue.maintenanceType),
            primaryStructuringElementType: arrayReducer(
              fieldsValue.primaryStructuringElementType
            ),

            secondaryStructuringElementType: arrayReducer(
              fieldsValue.secondaryStructuringElementType
            ),
            weatherType: arrayReducer(fieldsValue.weatherType),
            locationCoordinates: {
              lat: this.state.sighting.locationCoordinates.lat,
              lng: this.state.sighting.locationCoordinates.lng
            }
          }
        })
      }
    })

    JSON.stringify(sighting)
    console.log(sighting)

    await axios.put(
      `http://batman-backend-hitw.westeurope.azurecontainer.io/releves/${
      this.state.sighting.id
      }`,
      sighting
    )

    this.props.history.push(`/sightings/view/#${this.state.sighting.id}`);
    return
  }

  onMapClick = location => {
    this.setState({
      ...this.state,
      sighting: {
        ...this.state.sighting,
        locationCoordinates: {
          lat: location.latitude,
          lng: location.longitude
        }
      }
    })

    console.log(this.state)
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { isLoading, sighting } = this.state

    const config = {
      initialValue: sighting.startDate || moment(),
      rules: [
        {
          type: 'object',
          required: true,
          message: 'Veuillez sélectionner une date!'
        }
      ]
    }

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    }
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    }

    return (
      <Layout>
        {isLoading ? (
          <Spin size='large' />
        ) : (
            <div>
              <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                <Form.Item label='Date de la première mesure'>
                  {getFieldDecorator('startDate', config)(<DatePicker />)}
                </Form.Item>
                <Form.Item label={'Nombre d\'observations'}>
                  {getFieldDecorator('observationAmount', {
                    initialValue: sighting.observationAmount
                  })(<Input disabled />)}
                </Form.Item>
                <Form.Item label='Numéro du boitier'>
                  {getFieldDecorator('deviceNumber', {
                    rules: [
                      {
                        required: true,
                        message: 'Veuillez spécifier un numéro de boitier'
                      }
                    ]
                  })(<Input placeholder='Entrez un numéro de boitier' />)}
                </Form.Item>
                <Form.Item label='Numéro du micro'>
                  {getFieldDecorator('microphoneNumber', {
                    rules: [
                      {
                        required: true,
                        message: 'Veuillez specifier un numéro de micro'
                      }
                    ]
                  })(<Input placeholder='Entrez un numéro de micro' />)}
                </Form.Item>
                <Form.Item label={'Nom de l\'opérateur'}>
                  {getFieldDecorator('operatorName', {
                    rules: [
                      {
                        required: true,
                        message: "Veuillez entrer le nom de l'\'opérateur"
                      }
                    ]
                  })(<Input placeholder={'Entrez le nom de l\'opérateur'} />)}
                </Form.Item>

                <Form.Item label={'Site d\'enregistrement'}>
                  {getFieldDecorator('locationName', {
                    rules: [
                      {
                        required: true,
                        message: 'Veuillez spécifier un nom de site'
                      }
                    ]
                  })(<Input placeholder='Entrez le nom du site' />)}
                </Form.Item>
                <Form.Item label='Emplacement du site'>
                  {getFieldDecorator('devicePosition', {
                  })(
                    <div>
                      <p>Cliquer sur la carte à l'endroit où le boitier a été installé</p>
                      <Map
                        location={sighting.locationCoordinates}
                        addPushPinOnClick={this.onMapClick}
                        mapStyle={{ width: '1000px', height: '300px' }}
                      />
                    </div>
                  )}
                </Form.Item>
                <Form.Item label='Habitat dominant'>
                  {getFieldDecorator('habitatType', {
                    rules: [
                      {
                        type: 'array',
                        required: true,
                        message: 'Veuillez spécifier l\'habitat!'
                      }
                    ]
                  })(
                    <Cascader
                      placeholder={'Sélectionnez l\'habitat'}
                      options={habitats}
                    />
                  )}
                </Form.Item>
                <Form.Item label='Elément structurant principal (végétation)'>
                  {getFieldDecorator('primaryStructuringElementType', {
                    rules: [
                      {
                        type: 'array',
                        required: true,
                        message: 'Veuillez spécifier la végétation!'
                      }
                    ]
                  })(
                    <Cascader
                      placeholder='Sélectionner la végétation'
                      options={primaryVegetation}
                    />
                  )}
                </Form.Item>
                <Form.Item label='Elément structurant secondaire (divers)'>
                  {getFieldDecorator('secondaryStructuringElementType', {})(
                    <Cascader
                      placeholder={'Sélectionnez l\'élément structurant secondaire'}
                      options={secondaryVegetation}
                    />
                  )}
                </Form.Item>
                <Form.Item label='Gestion'>
                  {getFieldDecorator('maintenanceType', {
                    rules: [
                      {
                        type: 'array',
                        required: true,
                        message: 'Veuillez entrer la gestion!'
                      }
                    ]
                  })(
                    <Cascader
                      placeholder='Sélectionnez la gestion'
                      options={maintenance}
                    />
                  )}
                </Form.Item>
                <Form.Item label='Eclairage'>
                  {getFieldDecorator('isIlluminated', {
                    rules: [
                      {
                        type: 'array',
                        required: true,
                        message:
                          'Veuillez spécifier l\'éclairage!'
                      }
                    ]
                  })(
                    <Cascader
                      placeholder='Le site est-il éclairé?'
                      options={yesno}
                    />
                  )}
                </Form.Item>
                <Form.Item label='Hauteur de pose'>
                  {getFieldDecorator('height', {
                    rules: [
                      {
                        required: true,
                        message: "Veuillez indiquer la hauteur de pose"
                      }
                    ]
                  })(
                    <Input placeholder="Hauteur de pose du boitier" />
                  )}
                </Form.Item>
                <Form.Item label='Météo'>
                  {getFieldDecorator('weatherType', {
                    rules: [
                      {
                        type: 'array',
                        required: true,
                        message: "Veuillez indiquer la météo"
                      }
                    ]
                  })(
                    <Cascader
                      placeholder="Sélectionnez la météo"
                      options={weather}
                    />
                  )}
                </Form.Item>
                <Form.Item label='Commentaire'>
                  {getFieldDecorator('comment', {})(
                    <Input placeholder='Commentaire optionnel' />
                  )}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                  <Button type='primary' htmlType='submit'>
                    Envoyer
                </Button>
                </Form.Item>
              </Form>
            </div>
          )}
      </Layout>
    )
  }
}

const WrappedBatRegistrationSubmissionForm = Form.create({
  name: 'submissionform'
})(BatRegistrationSubmissionForm)

export default WrappedBatRegistrationSubmissionForm
