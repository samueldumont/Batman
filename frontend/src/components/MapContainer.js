import React from "react"
import { ReactBingmaps as Map } from "react-bingmaps"

export default props => {
  return (
    <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
      <div style={{ width: "1000px", height: "300px" }}>
        <Map
          bingmapKey="AgUP2Ggx3ggz9rMkWlfOIZ2TzuPJv2wJsrikjmLpxqNb1rc_sBYy4I_hwq8R7cnX"
          getLocation={{
            addHandler: "click",
            callback: props.addPushPinOnClick,
          }}
        />
      </div>
    </div>
  )
}
