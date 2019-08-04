import React from 'react'
import {
  DatePicker,
  Form,
  Input,
  Cascader,
  Button,
  Spin,
  Icon,
  Steps,
  Typography
} from 'antd'

import axios from 'axios'
import moment from 'moment'
import {
  Redirect
} from 'react-router-dom'

import Layout from '../../components/layout'
import 'antd/dist/antd.css'
import '../../styles/global.css'

import Map from '../../components/MapContainer'

const {
  Title
} = Typography
const {
  Step
} = Steps

const habitats = [{
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
    children: [{
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
    children: [{
        value: 'fleuves et gd rivières (L >10 m)',
        label: 'fleuves et gd rivières (L >10 m)'
      },
      {
        value: 'ruisseau (L < 3m)',
        label: 'ruisseau (L < 3m)'
      },
      {
        value: 'rivière (3m< L< 10m)',
        label: 'rivière (3m< L< 10m)'
      }
    ]
  },
  {
    value: 'Milieux rocheux',
    label: 'Milieux rocheux'
  },
  {
    value: 'Forêt feuillue',
    label: 'Forêt feuillue'
  },
  {
    value: 'Forêt résineuse',
    label: 'Forêt résineuse'
  },
  {
    value: 'Forêt mixte',
    label: 'Forêt mixte'
  },
  {
    value: 'Mise à blanc',
    label: 'Mise à blanc'
  }
]

const primaryVegetation = [{
    value: "Bande boisée et alignement d'arbres",
    label: "Bande boisée et alignement d'arbres"
  },
  {
    value: 'Haie',
    label: 'Haie'
  },
  {
    value: 'Arbre isolé',
    label: 'Arbre isolé'
  },
  {
    value: 'buissons isolés',
    label: 'buissons isolés'
  }
]

const weather = [{
    value: 'nuit calme',
    label: 'nuit calme'
  },
  {
    value: 'nuit pluvieuse',
    label: 'nuit pluvieuse'
  },
  {
    value: 'nuit orageuse',
    label: 'nuit orageuse'
  }
]

const maintenance = [{
    value: 'Eau - présence de végétation aquatique flottante',
    label: 'Eau - présence de végétation aquatique flottante'
  },
  {
    value: 'Forêt',
    label: 'Forêt',
    children: [{
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
    children: [{
        value: 'site pâturé (avec animaux présents)',
        label: 'site pâturé (avec animaux présents)'
      },
      {
        value: 'site fauché (récemment)',
        label: 'site fauché (récemment)'
      },
      {
        value: 'site non fauché',
        label: 'site non fauché'
      }
    ]
  }
]

const secondaryVegetation = [{
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
  {
    value: 'Autre',
    label: 'Autre'
  }
]

const yesno = [{
  value: 'yes',
  label: 'yes'
}, {
  value: 'no',
  label: 'no'
}]

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
        locationCoordinates: {
          lat: 50.606962,
          lng: 3.511842
        },
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
    this.setState({
      isLoading: true
    })

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
      this.setState({
        isLoading: false
      })
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
              lat: this.state.locationCoordinates.lat,
              lng: this.state.locationCoordinates.lng
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

    this.props.history.push("/sightings/view/");
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
    const {
      getFieldDecorator
    } = this.props.form
    const {
      isLoading,
      sighting
    } = this.state

    const config = {
      initialValue: sighting.startDate || moment(),
      rules: [{
        type: 'object',
        required: true,
        message: 'Please select a date!'
      }]
    }

    const formItemLayout = {
      labelCol: {
        xs: {
          span: 24
        },
        sm: {
          span: 8
        }
      },
      wrapperCol: {
        xs: {
          span: 24
        },
        sm: {
          span: 16
        }
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

    return ( <
      Layout > {
        isLoading ? ( <
          Spin size = 'large' / >
        ) : ( <
          div >
          <
          Title > Sighting #123</Title>
              <div style= {
            {
              marginBottom: '2rem'
            }
          } >
          <
          Steps >
          <
          Step status = "finish"
          title = "Metadata Uploaded"
          icon = {
            <
            Icon type = "user" / >
          }
          /> <
          Step status = "wait"
          title = "Sighting Completed"
          icon = {
            <
            Icon type = "solution" / >
          }
          /> <
          Step status = "wait"
          title = "Sound Analysis Completed"
          icon = {
            <
            Icon type = "smile-o" / >
          }
          /> < /
          Steps > <
          /div> <
          Form {
            ...formItemLayout
          }
          onSubmit = {
            this.handleSubmit
          } >
          <
          Form.Item label = 'Date of first night of measurement' > {
            getFieldDecorator('startDate', config)( < DatePicker / > )
          } <
          /Form.Item> <
          Form.Item label = 'Number of bat observations' > {
            getFieldDecorator('observationAmount', {
              initialValue: sighting.observationAmount
            })( < Input disabled / > )
          } <
          /Form.Item> <
          Form.Item label = 'Device number' > {
            getFieldDecorator('deviceNumber', {
              rules: [{
                required: true,
                message: 'Please specify a device number'
              }]
            })( < Input placeholder = 'Enter a device number' / > )
          } <
          /Form.Item> <
          Form.Item label = 'Microphone number' > {
            getFieldDecorator('microphoneNumber', {
              rules: [{
                required: true,
                message: 'Please specify a microphone number'
              }]
            })( < Input placeholder = 'Enter a microphone number' / > )
          } <
          /Form.Item> <
          Form.Item label = 'Operator name' > {
            getFieldDecorator('operatorName', {
              rules: [{
                required: true,
                message: "Please specify the operator's name"
              }]
            })( < Input placeholder = 'Enter the name of the operator' / > )
          } <
          /Form.Item>

          <
          Form.Item label = 'Location name' > {
            getFieldDecorator('locationName', {
              rules: [{
                required: true,
                message: 'Please specify the location of the measurement'
              }]
            })( < Input placeholder = 'Enter the location name' / > )
          } <
          /Form.Item> <
          Form.Item label = 'Device Position' > {
            getFieldDecorator('devicePosition', {})( <
              div >
              <
              p > Please click on the map where the device was placed < /p> <
              Map location = {
                sighting.locationCoordinates
              }
              addPushPinOnClick = {
                this.onMapClick
              }
              mapStyle = {
                {
                  width: '1000px',
                  height: '300px'
                }
              }
              /> < /
              div >
            )
          } <
          /Form.Item> <
          Form.Item label = 'Habitat Type' > {
            getFieldDecorator('habitatType', {
              rules: [{
                type: 'array',
                required: true,
                message: 'Please specify the habitat type!'
              }]
            })( <
              Cascader placeholder = 'Enter the habitat type'
              options = {
                habitats
              }
              />
            )
          } <
          /Form.Item> <
          Form.Item label = 'Primary Vegetation Type' > {
            getFieldDecorator('primaryStructuringElementType', {
              rules: [{
                type: 'array',
                required: true,
                message: 'Please specify the primary vegetation type!'
              }]
            })( <
              Cascader placeholder = 'Enter the primary vegetation type'
              options = {
                primaryVegetation
              }
              />
            )
          } <
          /Form.Item> <
          Form.Item label = 'Secondary Vegetation Type' > {
            getFieldDecorator('secondaryStructuringElementType', {})( <
              Cascader placeholder = 'Enter the secondary vegetation type'
              options = {
                secondaryVegetation
              }
              />
            )
          } <
          /Form.Item> <
          Form.Item label = 'Maintenance Type' > {
            getFieldDecorator('maintenanceType', {
              rules: [{
                type: 'array',
                required: true,
                message: 'Please specify the primary vegetation type!'
              }]
            })( <
              Cascader placeholder = 'Enter the type of maintenance'
              options = {
                maintenance
              }
              />
            )
          } <
          /Form.Item> <
          Form.Item label = 'Exposure to sunlight' > {
            getFieldDecorator('isIlluminated', {
              rules: [{
                type: 'array',
                required: true,
                message: 'Please specify whether the site is explosed to sunlight!'
              }]
            })( <
              Cascader placeholder = 'Specify whether the site is exposed to sunlight'
              options = {
                yesno
              }
              />
            )
          } <
          /Form.Item> <
          Form.Item label = 'Height' > {
            getFieldDecorator('height', {
              rules: [{
                required: true,
                message: "Please specify the device's positioning height"
              }]
            })( <
              Input placeholder = "Enter the device's positioning height" / >
            )
          } <
          /Form.Item> <
          Form.Item label = 'Weather type' > {
            getFieldDecorator('weatherType', {
              rules: [{
                type: 'array',
                required: true,
                message: "Please specify the night's weather type!"
              }]
            })( <
              Cascader placeholder = "Specify whether the night's weather type"
              options = {
                weather
              }
              />
            )
          } <
          /Form.Item> <
          Form.Item label = 'Comments' > {
            getFieldDecorator('comment', {})( <
              Input placeholder = 'Enter a comment if so desired' / >
            )
          } <
          /Form.Item> <
          Form.Item {
            ...tailFormItemLayout
          } >
          <
          Button type = 'primary'
          htmlType = 'submit' >
          Save <
          /Button> < /
          Form.Item > <
          /Form> < /
          div >
        )
      } <
      /Layout>
    )
  }
}

const WrappedBatRegistrationSubmissionForm = Form.create({
  name: 'submissionform'
})(BatRegistrationSubmissionForm)

export default WrappedBatRegistrationSubmissionForm
