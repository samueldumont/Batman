import React from "react"
import { DatePicker, Form, Input, Cascader, Button } from "antd"

const habitats = [
  {
    value: "Cavité - carrière, mine et grotte",
    label: "Cavité - carrière, mine et grotte",
  },
  {
    value: "Bâtiments",
    label: "Bâtiments",
  },
  {
    value: "Bâtiments",
    label: "Bâtiments",
  },
  {
    value: "Plan d'eau - mare",
    label: "Plan d'eau - mare",
    children: [
      {
        value: "< 50m²",
        label: "< 50m²",
      },
      {
        value: "> 50m²",
        label: "> 50m²",
      },
    ],
  },
]

const primaryVegetation = [
  {
    value: "Bande boisée et alignement d'arbres",
    label: "Bande boisée et alignement d'arbres",
  },
  { value: "Haie", label: "Haie" },
  { value: "Arbre isolé", label: "Arbre isolé" },
  { value: "buissons isolés", label: "buissons isolés" },
]

const weather = [
  {
    value: "nuit calme",
    label: "nuit calme",
  },
  { value: "nuit pluvieuse", label: "nuit pluvieuse" },
  { value: "nuit orageuse", label: "nuit orageuse" },
]

const maintenance = [
  {
    value: "Eau - présence de végétation aquatique flottante",
    label: "Eau - présence de végétation aquatique flottante",
  },
  {
    value: "Forêt",
    label: "Forêt",
    children: [
      {
        value: "peuplement jeune ( < 50 cm diam)",
        label: "peuplement jeune ( < 50 cm diam)",
      },
      {
        value: "peuplement avec gros bois ( > 50 cm diam)",
        label: "peuplement avec gros bois ( > 50 cm diam)",
      },
    ],
  },
  {
    value: "Prairie",
    label: "Prairie",
    children: [
      {
        value: "site pâturé (avec animaux présents)",
        label: "site pâturé (avec animaux présents)",
      },
      { value: "site fauché (récemment)", label: "site fauché (récemment)" },
      { value: "site non fauché", label: "site non fauché" },
    ],
  },
]

const secondaryVegetation = [
  {
    value: "Layons forestier",
    label: "Layons forestier",
  },
  {
    value: "Route (induré, circulation véhicule rapide)",
    label: "Route (induré, circulation véhicule rapide)",
  },
  {
    value: "Chemin (induré, circulation véhicule lents)",
    label: "Chemin (induré, circulation véhicule lents)",
  },
  {
    value: "Sentier (non induré - circulation piétonne)",
    label: "Sentier (non induré - circulation piétonne)",
  },
  { value: "Autre", label: "Autre" },
]

const yesno = [{ value: "yes", label: "yes" }, { value: "no", label: "no" }]

class BatRegistrationSubmissionForm extends React.Component {
  state = {
    confirmDirty: false,
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.form.validateFields((err, fieldsValue) => {
          if (err) {
            return
          }

          // Should format date value before submit.
          const values = {
            ...fieldsValue,
            "date-picker": fieldsValue["date-picker"].format("DD-MM-YYYY"),
          }

          // should join the values of the coordinates
        })
      }
    })
  }

  handleConfirmBlur = e => {
    const { value } = e.target
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
  }

  render() {
    const { getFieldDecorator } = this.props.form

    const config = {
      rules: [
        {
          type: "object",
          required: true,
          message: "Please select a date!",
        },
      ],
    }

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    }
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    }

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="Device number">
          {getFieldDecorator("email", {
            rules: [
              {
                required: true,
                message: "Please specify a device number",
              },
            ],
          })(<Input placeholder="Enter a device number" />)}
        </Form.Item>
        <Form.Item label="Microphone numberr">
          {getFieldDecorator("email", {
            rules: [
              {
                required: true,
                message: "Please specify a microphone number",
              },
            ],
          })(<Input placeholder="Enter a microphone number" />)}
        </Form.Item>
        <Form.Item label="Operator name">
          {getFieldDecorator("email", {
            rules: [
              {
                required: true,
                message: "Please specify the operator's name",
              },
            ],
          })(<Input placeholder="Enter the name of the operator" />)}
        </Form.Item>
        <Form.Item label="Date of first night of measurement">
          {getFieldDecorator("date-picker", config)(<DatePicker />)}
        </Form.Item>
        <Form.Item label="Location name">
          {getFieldDecorator("email", {
            rules: [
              {
                required: true,
                message: "Please specify the location of the measurement",
              },
            ],
          })(<Input placeholder="Enter the location name" />)}
        </Form.Item>
        <Form.Item label="Latitude">
          {getFieldDecorator("email", {
            rules: [
              {
                required: true,
                message: "Please specify the location's latitude",
              },
            ],
          })(<Input placeholder="Enter the location's latitude" />)}
        </Form.Item>
        <Form.Item label="Longitude">
          {getFieldDecorator("email", {
            rules: [
              {
                required: true,
                message: "Please specify the location's longitude",
              },
            ],
          })(<Input placeholder="Enter the location's longitude" />)}
        </Form.Item>
        <Form.Item label="Habitat Type">
          {getFieldDecorator("residence", {
            rules: [
              {
                type: "array",
                required: true,
                message: "Please specify the habitat type!",
              },
            ],
          })(
            <Cascader placeholder="Enter the habitat type" options={habitats} />
          )}
        </Form.Item>
        <Form.Item label="Primary Vegetation Type">
          {getFieldDecorator("residence", {
            rules: [
              {
                type: "array",
                required: true,
                message: "Please specify the primary vegetation type!",
              },
            ],
          })(
            <Cascader
              placeholder="Enter the primary vegetation type"
              options={primaryVegetation}
            />
          )}
        </Form.Item>
        <Form.Item label="Secondary Vegetation Type">
          {getFieldDecorator("residence", {})(
            <Cascader
              placeholder="Enter the secondary vegetation type"
              options={secondaryVegetation}
            />
          )}
        </Form.Item>
        <Form.Item label="Maintenance Type">
          {getFieldDecorator("residence", {
            rules: [
              {
                type: "array",
                required: true,
                message: "Please specify the primary vegetation type!",
              },
            ],
          })(
            <Cascader
              placeholder="Enter the type of maintenance"
              options={maintenance}
            />
          )}
        </Form.Item>
        <Form.Item label="Exposure to sunlight">
          {getFieldDecorator("residence", {
            rules: [
              {
                type: "array",
                required: true,
                message:
                  "Please specify whether the site is explosed to sunlight!",
              },
            ],
          })(
            <Cascader
              placeholder="Specify whether the site is exposed to sunlight"
              options={yesno}
            />
          )}
        </Form.Item>
        <Form.Item label="Height">
          {getFieldDecorator("email", {
            rules: [
              {
                required: true,
                message: "Please specify the device's positioning height",
              },
            ],
          })(<Input placeholder="Enter the device's positioning height" />)}
        </Form.Item>
        <Form.Item label="Weather type">
          {getFieldDecorator("residence", {
            rules: [
              {
                type: "array",
                required: true,
                message: "Please specify the night's weather type!",
              },
            ],
          })(
            <Cascader
              placeholder="Specify whether the night's weather type"
              options={weather}
            />
          )}
        </Form.Item>
        <Form.Item label="Comments">
          {getFieldDecorator("email", {})(
            <Input placeholder="Enter a comment if so desired" />
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

const WrappedBatRegistrationSubmissionForm = Form.create({ name: "register" })(
  BatRegistrationSubmissionForm
)

export default WrappedBatRegistrationSubmissionForm
