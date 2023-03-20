import React, { useState, useEffect, useRef } from "react";
import styles from "./Toggle.module.css";
import { Camera } from "../Media/Camera";
import axios from "axios";
import S3 from "react-aws-s3";
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");

export default function Toggle(props) {
  const [iconToggle, setIconToggle] = useState(true);
  const [fileName, setFileName] = useState();
  const [fileNameToggle, setFileNameToggle] = useState(false);
  const inputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://travelimagebucket.s3.us-west-2.amazonaws.com/${props.id}-${props.type}.jpeg`
      )
      .then((res) => {
        if (res.status !== 404) {
          setIconToggle(false);
        }
      });
  }, [props.id]);
  useEffect(() => {
    setFileNameToggle(true);
  }, [selectedFile]);
  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  const uploadFile = async () => {
    const ReactS3Client = new S3(config);

    ReactS3Client.uploadFile(selectedFile, `${props.id}-${props.type}`)
      .then((data) => console.log(data.location))
      .catch((err) => console.error(err));
  };

  useEffect(() => {setIconToggle(!iconToggle)}, [props.edit])
  const {
    REACT_APP_BUCKETNAME,
    REACT_APP_REGION,
    REACT_APP_ACCESSKEYID,
    REACT_APP_SECRETACCESSKEY,
  } = process.env;
  // the configuration information is fetched from the .env file
  const config = {
    bucketName: REACT_APP_BUCKETNAME,
    region: REACT_APP_REGION,
    accessKeyId: REACT_APP_ACCESSKEYID,
    secretAccessKey: REACT_APP_SECRETACCESSKEY,
  };
  const onInputClick = () => {
    inputRef.current.click();
  };

  console.log(selectedFile?.name, "this is my selected file");
  return (
    <>
      {iconToggle ? (
        <div
          className={styles.column}
          onClick={() => props.filterName(props.type)}
        >
          <input
            onChange={(event) => {
              handleFileInput(event);
            }}
            ref={inputRef}
            type="file"
            name=""
            style={{ display: "none" }}
          />
          <Camera
            upload={() => {
              onInputClick();
            }}
          />
          {fileNameToggle ? (
            <div className={styles.white}>{selectedFile?.name}</div>
          ) : (
            <></>
          )}

          {/* <div>{props.file.name}</div> */}
          <button
            className={styles.button}
            onClick={() => {
              uploadFile().then(() => {
                props.stopEdit();
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
