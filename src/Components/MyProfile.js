import React, { useState, useEffect, useRef } from "react";
import styles from "./my-profile.module.css";

import { signOut } from "firebase/auth";
import { auth } from "./Firebase";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Header from "./pieces/Header";

import S3 from "react-aws-s3";
import { Camera } from "./Media/Camera";
import Toggle from "./pieces/Toggle";
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const getSignedUrl = require("@aws-sdk/s3-request-presigner");

function MyProfile() {
  const [myTrips, setMyTrips] = useState([]);
  const [myId, setMyId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [insta, setInsta] = useState("");
  const [bio, setBio] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileEdit, setProfileEdit] = useState(false);

  window.Buffer = window.Buffer || require("buffer").Buffer;
  const inputRef = useRef(null);
  const [photoName, setPhotoName] = useState("");

  const [email, setEmail] = useState("");
  const region = "us-west-2";
  const accessKeyId = "AKIA33JD5MXA4IOG2YU4";
  const secretAccessKey = "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";

  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const client = new S3Client({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });

  const logout = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:3001/person/${localStorage.getItem("userEmail")}`,
    }).then((res) => {
      setEmail(localStorage.getItem("userEmail"));
      setBio(res.data[0].bio);
      setInsta(res.data[0].instagram);
      setFirstName(res.data[0].firstname);
      setLastName(res.data[0].lastname);
      setMyId(res.data[0].id);
      setInsta(res.data[0].insta);
      setBio(res.data[0].bio);
    });
  }, []);

  const onInputClick = () => {
    inputRef.current.click();
  };

  const handleDelete = async (id) => {
    try {
      let deleteTrip = await axios.delete(
        `http://localhost:3001/deletetrip/${id}`,
        {}
      );
      setMyTrips(myTrips.filter((trip) => trip.id !== id));
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleSubmit = async () => {
    try {
      return await axios.put(`http://localhost:3001/editperson/${myId}`, {
        instagram: insta,
        bio: bio,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const [selectedFile, setSelectedFile] = useState(null);

  // the configuration information is fetched from the .env file
  const config = {
    bucketName: "travelimagebucket",
    region: "us-west-2",
    accessKeyId: "AKIA33JD5MXA6WMNIZ4S",
    secretAccessKey: "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",
  };

  const handleFileInput = (e) => {
    console.log(e.target.files[0]);

    setSelectedFile(e.target.files[0]);
  };
  const getFileUrl = () => {
    getSignedUrl(
      client,
      new GetObjectCommand({
        Bucket: "travelimagebucket",
        Key: "pexels-johannes-plenio-1105391.jpg",
      })
      // 60 seconds
    )
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  const uploadFile = async () => {
    debugger;
    const ReactS3Client = new S3(config);

    ReactS3Client.uploadFile(selectedFile, `${myId}-${photoName}`)
      .then((data) => console.log(data.location))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <Header
        home={"Home"}
        myTrips={"My Trips"}
        myProfile={"My Profile"}
        id={myId}
        out={"Logout"}
        color="black"
      />
      <div className={styles.profileWholeScreen}>
        <div className={styles.leftProfileContainer}>
          <div className={styles.profileTitle}>{firstName}</div>
          <div className={styles.profileTitle}>{lastName}</div>
          <div>
            <div className={styles.profileItem}>
              {localStorage.getItem("userEmail")}
            </div>
            {profileEdit ? (
              <>
                <textarea
                  className={styles.editInput}
                  type="text"
                  placeholder="instagram"
                  onChange={(event) => {
                    setInsta(event.target.value);
                  }}
                />
                <textarea
                  className={styles.editInput}
                  type="text"
                  placeholder="Whats your bio"
                  onChange={(event) => {
                    setBio(event.target.value);
                  }}
                />
              </>
            ) : (
              <>
                <div className={styles.profileItem}>Insta: {insta} </div>

                <div className={styles.profileItem}>{bio}</div>
              </>
            )}
            <div className={styles.profileItem}>3 Trips Taken</div>
          </div>
          <div className={styles.editContainer}>
            {profileEdit ? (
              <>
                <button
                  onClick={() => {
                    setProfileEdit(!profileEdit);

                    handleSubmit();
                  }}
                >
                  Save Changes
                </button>
                <button
                  onClick={() => {
                    setProfileEdit(!profileEdit);
                  }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <div className={styles.editButtonContainer}>
                <button
                  onClick={() => {
                    alert(
                      "this button doesnt work yet, will add at some point in the future"
                    );
                  }}
                  className={styles.profileItem}
                >
                  Send Message
                </button>
                <div
                  onClick={() => {
                    setProfileEdit(!profileEdit);
                  }}
                  className={styles.edit}
                >
                  ...
                </div>
              </div>
            )}
          </div>
          <textarea
            onChange={(event) => {
              handleFileInput(event);
            }}
            ref={inputRef}
            type="file"
            name=""
            style={{ display: "none" }}
          />
        </div>

        <div>
          {profileEdit ? (
            <div className={styles.rightProfileContainer}>
              <div className={styles.mainImageContainer}>
                <div className={styles.mainPic}>
                  <Camera />
                </div>
              </div>
              <div className={styles.rightSidePhotos}>
                <div className={styles.smallPhoto}>
                  <Camera />
                </div>
                <div className={styles.smallPhoto}>
                  <Camera />
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.rightProfileContainer}>
              <div className={styles.mainImageContainer}>
                <Toggle
                  id={myId}
                  type={"main"}
                  class={styles.mainPic}
                  filterName={() => {
                    setPhotoName();
                  }}
                />
              </div>
              <div className={styles.rightSidePhotos}>
                <Toggle
                  id={myId}
                  type={"rightSide"}
                  class={styles.smallPhoto}
                  filterName={() => {
                    setPhotoName();
                  }}
                />
                <Toggle
                  id={myId}
                  type={"rightbottom"}
                  class={styles.smallPhoto}
                  filterName={() => {
                    setPhotoName();
                  }}
                />
              </div>
            </div>
          )}

          <div className={styles.bottomContainer}>
            <div className={styles.friends}></div>
          </div>
        </div>

        <div />
      </div>
    </div>
  );
}
export default MyProfile;
