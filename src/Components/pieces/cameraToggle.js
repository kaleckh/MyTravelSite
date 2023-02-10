import React, { useState } from "react";

import "./Header.css";
import { Camera } from "../Media/Camera";
import styles from "./cameraToggle.module.css";
import { auth } from "../Firebase";
import { signOut } from "firebase/auth";

export default function CameraToggle() {
  const [uploadToggle, setUploadToggle] = useState(false);

  return (
    <div className={styles.uploadContainer}>
      <Camera />
      <input
        onChange={() => {
          setUploadToggle(!uploadToggle);
        }}
        type="file"
        className={styles.hide}
      />
      {uploadToggle && <button>Upload your file</button>}
    </div>
  );
}
