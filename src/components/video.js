/* eslint jsx-a11y/media-has-caption: 0 */

import React, { useState } from "react"

import styles from "./video.module.css"
import volume from "../images/volume.svg"

const Video = ({ src }) => {
  const [unmuted, setUnmuted] = useState(false)

  return (
    <div className={styles.wrapper}>
      <video
        autoPlay
        muted={!unmuted}
        loop
        playsInline
        preload="metadata"
        onClick={() => setUnmuted(!unmuted)}
      >
        <source src={src} type="video/mp4" />
      </video>
      {!unmuted && (
        <div className={styles.mute}>
          <img src={volume} alt="Video mute icon" />
        </div>
      )}
    </div>
  )
}

export default Video
