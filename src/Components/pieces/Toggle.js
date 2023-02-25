import React, { useState } from "react";
import "./Header.css";
import { Camera } from "../Media/Camera";




export default function Toggle(props) {
  const [iconToggle, setIconToggle] = useState(false);
console.log(props)
  return (
    <>
      {iconToggle ? (
        <div onClick={() => (props.filterName(props.type))}>
          <Camera
            upload={() => {
              props.onInputClick();
            }}
          />
          <button
            onClick={() => {
              props.uploadFile();
            }}
          >
            Upload
          </button>
        </div>
      ) : (
        <>
          <img
            className={props.class}
            src={`https://travelimagebucket.s3.us-west-2.amazonaws.com/${props.id}-${props.type}.jpeg`}
          />
        </>
      )}
    </>
  );
}
