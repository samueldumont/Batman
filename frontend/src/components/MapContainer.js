import React from 'react'
import { ReactBingmaps as Map } from 'react-bingmaps'

export default props => {
  const { lat, lng } = props.location

  return (
    <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
      <div style={props.mapStyle}>
        <Map
          center={[lat, lng]}
          zoom={15}
          bingmapKey='AgUP2Ggx3ggz9rMkWlfOIZ2TzuPJv2wJsrikjmLpxqNb1rc_sBYy4I_hwq8R7cnX'
          getLocation={{
            addHandler: 'click',
            callback: props.addPushPinOnClick
          }}
          pushPins={[
            {
              "location": [lat, lng],
              "option": { color: 'red', title: `Batman and Robin's lovehut` }
            }
          ]}
        />
      </div>
    </div>
  )
}
