import React, { useState, useEffect, useRef } from "react";
import styles from "./my-profile.module.css";

import { signOut } from "firebase/auth";
import { auth } from "./Firebase";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import Header from "./pieces/Header";

import { Camera } from "./Media/Camera";
import Toggle from "./pieces/Toggle";
const { REACT_APP_URL } = process.env;

const getSignedUrl = require("@aws-sdk/s3-request-presigner");

function Profile() {
  const [myTrips, setMyTrips] = useState([]);
  const [myId, setMyId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [insta, setInsta] = useState("");
  const [bio, setBio] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileEdit, setProfileEdit] = useState(false);
  const [mainPhoto, setMainPhoto] = useState(true);
  const [topPhoto, setTopPhoto] = useState(true);
  const [bottomPhoto, setBottomPhoto] = useState(true);
  const [uploadToggle, setUploadToggle] = useState();
  const [file1, setFile1] = useState();
  const [file2, setFile2] = useState();
  const [file3, setFile3] = useState();

  window.Buffer = window.Buffer || require("buffer").Buffer;
  const inputRef = useRef(null);
  const [photoName, setPhotoName] = useState("");

  const [email, setEmail] = useState("");
  const region = "us-west-2";

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const { id } = useParams();
  const logout = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    axios({
      method: "get",
      url: `${REACT_APP_URL}/person/${id}`,
    }).then((res) => {
      setEmail(id);
      setBio(res.data[0].bio);
      setInsta(res.data[0].instagram);
      setFirstName(res.data[0].firstname);
      setLastName(res.data[0].lastname);
      setMyId(res.data[0].id);

      setBio(res.data[0].bio);
      setMainPhoto(res.data[0].main);
      setTopPhoto(res.data[0].rightside);
      setBottomPhoto(res.data[0].rightbottom);
    });
  }, []);

  const handleDelete = async (id) => {
    try {
      let deleteTrip = await axios.delete(
        `${REACT_APP_URL}/deletetrip/${id}`,
        {}
      );
      setMyTrips(myTrips.filter((trip) => trip.id !== id));
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleSubmit = async () => {
    try {
      return await axios.put(`${REACT_APP_URL}/editperson/${myId}`, {
        instagram: insta,
        bio: bio,
        main: mainPhoto,
        rightside: topPhoto,
        rightbottom: bottomPhoto,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  // const client = new S3Client({
  //   REACT_APP_REGION,
  //   credentials: {
  //     REACT_APP_ACCESSKEYID,
  //     REACT_APP_SECRETACCESSKEY,
  //   },
  // });

  // const getFileUrl = () => {
  //   getSignedUrl(
  //     client,
  //     new GetObjectCommand({
  //       Bucket: "travelimagebucket",
  //       Key: "pexels-johannes-plenio-1105391.jpg",
  //     })
  //     // 60 seconds
  //   )
  //     .then((res) => {})
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

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
          <div className={styles.eighty}>
            <div className={styles.profileItem}>{id}</div>
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
                  className={styles.Button}
                  onClick={() => {
                    setProfileEdit(!profileEdit);

                    handleSubmit();
                  }}
                >
                  Save Changes
                </button>
                <button
                  className={styles.Button}
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
                  className={styles.Button}
                >
                  Send Message
                </button>
              </div>
            )}
          </div>
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
                  type={"main"}
                  id={myId}
                  class={styles.mainPic}
                  filterName={() => {
                    setPhotoName("main");
                  }}
                />
              </div>
              <div className={styles.rightSidePhotos}>
                <div className={styles.smallPhoto}>
                  <Toggle
                    id={myId}
                    type={"rightside"}
                    class={styles.smallPhoto}
                    filterName={() => {
                      setPhotoName("rightside");
                    }}
                  />
                </div>
                <div className={styles.smallPhoto}>
                  <Toggle
                    id={myId}
                    type={"rightbottom"}
                    class={styles.smallPhoto}
                    filterName={() => {
                      setPhotoName("rightbottom");
                    }}
                  />
                </div>
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
export default Profile;
