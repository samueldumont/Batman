import React from 'react'
import { ReactBingmaps as Map } from 'react-bingmaps'

export default props => {
  const { lat, lng } = props.location
  const { zoom = 15 } = props
  let pushPins = []

  if (props.pushPins !== undefined && Array.isArray(props.pushPins)) {
    props.pushPins.forEach(function (element) {
      let color = "blue"
      if (element["observationAmount"] > 150) {
        color = "orange"
      }
      if (element["observationAmount"] > 300) {
        color = "red"
      }
      pushPins.push({
        "location": [element["locationCoordinates"]["lat"], element["locationCoordinates"]["lng"]],
        "option": {
          color: color,
          description: element["observationAmount"].toString() + " observations",
          title: element["observationAmount"].toString(),
          subTitle: element["observationAmount"],
        },
        "addHandler": { "type": "click", callback: function () { console.log(element) } }
      })
    })
  } else {
    console.log(lat)
    pushPins = [
      {
        "location": [lat, lng],
        "option": { color: 'red', title: `Batman and Robin's lovehut` }
      }
    ]
  }

  return (
    <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
      <div style={props.mapStyle}>
        <Map
          center={[lat, lng]}
          zoom={zoom}
          bingmapKey='AgUP2Ggx3ggz9rMkWlfOIZ2TzuPJv2wJsrikjmLpxqNb1rc_sBYy4I_hwq8R7cnX'
          getLocation={{
            addHandler: 'click',
            callback: props.addPushPinOnClick
          }}
          pushPins={pushPins}
        />
      </div>
    </div>
  )
}
