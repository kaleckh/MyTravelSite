import React, { useState, useEffect } from "react";
import styles from "./Toggle.module.css";
import { Camera } from "../Media/Camera";
import axios from "axios";

export default function Toggle(props) {
  const [iconToggle, setIconToggle] = useState(true);
  const [mainPhoto, setMainPhoto] = useState(false);
  const [topPhoto, setTopPhoto] = useState(false);
  const [bottomPhoto, setBottomPhoto] = useState(false);

  useEffect(() => {
    axios
      .get(
        `https://travelimagebucket.s3.us-west-2.amazonaws.com/${props.id}-${props.type}.jpeg`
      )
      .then((res) => {
        if(res.status !== 404) {
          setIconToggle(false)
        } 
      });
  }, []);
  console.log(props.id)
  return (
    <>
      {iconToggle ? (
        <div
          className={styles.column}
          onClick={() => props.filterName(props.type)}
        >
          <Camera
            upload={() => {
              props.onInputClick();
            }}
          />
          {/* <div>{props.file.name}</div> */}
          <button
            className={styles.button}
            onClick={() => {
              props.uploadFile().then(() => {
                setIconToggle(false);
              });
            }}
          >
            Upload
          </button>
        </div>
      ) : (
        <div className={styles.border}>
          <img
            className={props.class}
            src={`https://travelimagebucket.s3.us-west-2.amazonaws.com/${props.id}-${props.type}.jpeg`}
          />
        </div>
      )}
    </>
  );
}
