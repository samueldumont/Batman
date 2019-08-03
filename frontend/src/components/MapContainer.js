import React from 'react'
import { ReactBingmaps as Map } from 'react-bingmaps'

export default props => {
  const { lat, lng } = props.location

  return (
    <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '1000px', height: '300px' }}>
        <Map
          center={[lat || 50.606962, lng || 3.511842]}
          zoom={15}
          bingmapKey='AgUP2Ggx3ggz9rMkWlfOIZ2TzuPJv2wJsrikjmLpxqNb1rc_sBYy4I_hwq8R7cnX'
          getLocation={{
            addHandler: 'click',
            callback: props.addPushPinOnClick
          }}
          pushPins={[
            {
              "location": [lat || 50.606962, lng || 3.511842],
              "option": { color: 'red', title: `Batman and Robin's lovehut` }
            }
          ]}
        />
      </div>
    </div>
  )
}
