import React, { useState, useEffect, useRef } from "react";
import styles from "./MyProfile.module.css";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "./Firebase";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Header from "./pieces/Header";
import { Camera } from "./Media/Camera";

import S3 from "react-aws-s3";
import CameraToggle from "./pieces/cameraToggle";

function MyProfile() {
  const [profileToggle, setProfileToggle] = useState(false);
  const [myTrips, setMyTrips] = useState([]);
  const [myId, setMyId] = useState("");

  const [tripLocation, setTripLocation] = useState("");
  const [tripDates, setTripDates] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSettingLocation, setIsSettingLocation] = useState(false);
  const [isAddingTrip, setIsAddingTrip] = useState(true);
  const [isSettingDate, setIsSettingDate] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [insta, setInsta] = useState("");
  const [bio, setBio] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileEdit, setProfileEdit] = useState(false);
  const [toggleFile, setToggleFile] = useState(false);
  window.Buffer = window.Buffer || require("buffer").Buffer;
  const inputRef = useRef(null);

  const Navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const logout = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:3001/person/${localStorage.getItem("userEmail")}`,
    }).then((res) => {
      setBio(res.data[0].bio);
      setInsta(res.data[0].instagram);
      setFirstName(res.data[0].firstname);
      setLastName(res.data[0].lastname);
      setMyId(res.data[0].id);
    });
  }, []);

  const onInputClick = (name) => {
    
    inputRef.current.click(name);
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
      debugger;
      return await axios.put(`http://localhost:3001/editperson/${myId}`, {
        firstname: firstName,
        lastname: lastName,
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
    accessKeyId: "AKIA33JD5MXASQ5NXR5S",
    secretAccessKey: "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",
  };

  const handleFileInput = (e, name) => {
    

    setSelectedFile(e.target.files[0]);
  };

  {
    /* <input
              onChange={(event) => {
                handleFileInput(event);
              }}
              className={styles.upload}
              type="file"
            />
            <button
              className={styles.upload}
              onClick={() => {
                debugger;
                uploadFile(selectedFile);
              }}
            >
              Send that one!
            </button> */
  }

  const uploadFile = async (file) => {
    const ReactS3Client = new S3(config);
    debugger;
    console.log(file);
    ReactS3Client.uploadFile(file, file.name)
      .then((data) => console.log(data.location))
      .catch((err) => console.error(err));
  };
  console.log(process.env.REACT_APP_bucketName);
  return (
    <div>
      <Header
        home={"Home"}
        createTrip={"Create Trip"}
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
                <input
                  className={styles.editInput}
                  type="text"
                  placeholder="instagram"
                  onChange={(event) => {
                    setInsta(event.target.value);
                  }}
                />
                <input
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
                    debugger;
                    handleSubmit();
                  }}
                >
                  Save Changes
                </button>
              </>
            ) : (
              <>
                <button className={styles.profileItem}>Send Message</button>
                <div
                  onClick={() => {
                    setProfileEdit(!profileEdit);
                  }}
                  className={styles.edit}
                >
                  ...
                </div>
              </>
            )}
          </div>
          <input
            onChange={(event) => {
              handleFileInput(event);
            }}
            ref={inputRef}
            type="file"
            name=""
            style={{ display: "none" }}
          />
        </div>

        <div className={styles.rightProfileContainer}>
          <div className={styles.mainImageContainer}>
            <div
              onClick={() => {
                onInputClick(localStorage.getItem("userEmail"));
              }}
              className={styles.mainImage}
            >
              <Camera />
            </div>
            <div className={styles.rightSidePhotos}>
              <div onClick={() => {}} className={styles.imageDiv}>
                <Camera />
              </div>
            </div>
          </div>
          <div className={styles.bottomContainer}>
            <div className={styles.friends}>
              <div className={styles.title}>Friends</div>
            </div>
            <div className={styles.pastTrips}>
              <div className={styles.title}>Previous Trips</div>
              <div className={styles.row}>
                <div className={styles.imageDiv}></div>
                <div className={styles.imageDiv}></div>
              </div>
            </div>
          </div>

          <div />
        </div>
      </div>
    </div>
  );
}
export default MyProfile;
