import styles from "./Home.module.css";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { auth } from "./Firebase";
import Header from "./pieces/Header";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import loginPhoto from "./Media/loginphoto.jpg";
const {REACT_APP_URL} = process.env
function Home() {
  const Navigate = useNavigate();

  const [homeScreen, sethomeScreen] = useState(true);
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginToggle, setLogin] = useState("");

  const register = async () => {
    try {
      return await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const login = async () => {
    console.log(loginEmail, loginPassword, "emails and pasword");
    try {
      const loggedUser = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      localStorage.setItem(`userEmail`, `${auth.currentUser.email}`);
      return loggedUser;
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = async () => {
    debugger;
    try {
      return await axios.post(`${REACT_APP_URL}/newperson`, {
        firstname: firstName,
        lastname: lastName,
        email: registerEmail,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={styles.full}>
      <div className={styles.wholeScreen}>
        {homeScreen ? (
          <>
            <div className={styles.mainContainer}>
              <div className={styles.mainBox}>
                <div className={styles.homeTitle}>
                  Meet cool people and travel the world
                </div>
                <div className={styles.buttonContainer}>
                  <button
                    className={styles.button}
                    onClick={() => {
                      sethomeScreen(false);
                      setLogin(true);
                    }}
                  >
                    Login
                  </button>
                  <button
                    className={styles.button}
                    onClick={() => {
                      sethomeScreen(false);
                      setLogin(false);
                    }}
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className={`${styles.loginContainer} ${styles.blur}`}>
            <div className={styles.loginPage}>
              <div className={styles.leftSideInput}>
                <img className={styles.loginImage} src={loginPhoto} alt="" />
              </div>

              {loginToggle ? (
                <div className={styles.inputContainer}>
                  <div className={styles.loginBackContainer}>
                    <div
                      onClick={() => {
                        sethomeScreen(!homeScreen);
                      }}
                      className={styles.back}
                    >
                      X
                    </div>
                  </div>
                  <div className={styles.words}>Login!</div>
                  <div className={styles.row}></div>
                  <div className={styles.inputContainer}>
                    <input
                      className={styles.input}
                      onChange={(event) => {
                        setLoginEmail(event.target.value);
                      }}
                      placeholder="email"
                      type="text"
                    />
                    <input
                      className={styles.input}
                      onChange={(event) => {
                        setLoginPassword(event.target.value);
                      }}
                      placeholder="password"
                      type="password"
                    />
                  </div>

                  <div>
                    <button
                      className={styles.loginbutton}
                      onClick={() => {
                        setLogin(false);
                      }}
                    >
                      Register
                    </button>
                    <button
                      onClick={() => {
                        login().then(() => {
                          Navigate(`/person/${auth.currentUser.uid}`);
                        });
                      }}
                      className={styles.loginbutton}
                    >
                      Login
                    </button>
                  </div>
                </div>
              ) : (
                <div className={styles.inputContainer}>
                  <div className={styles.words}>Welcome</div>
                  <div className={styles.inputTop}>
                    <div className={styles.row}>
                      <input
                        className={styles.input}
                        onChange={(event) => {
                          setFirstName(event.target.value);
                        }}
                        placeholder="first name"
                        type="text"
                      />
                      <input
                        className={styles.input}
                        onChange={(event) => {
                          setLastName(event.target.value);
                        }}
                        placeholder="last name"
                        type="text"
                      />
                    </div>

                    <input
                      className={styles.input}
                      onChange={(event) => {
                        setRegisterEmail(event.target.value);
                      }}
                      placeholder="email"
                      type="text"
                    />
                    <input
                      className={styles.input}
                      onChange={(event) => {
                        setRegisterPassword(event.target.value);
                      }}
                      placeholder="password"
                      type="password"
                    />

                    <div className={styles.row}>
                      <button
                        className={styles.loginbutton}
                        onClick={() => {
                          Promise.all([register(), handleSubmit()]).then(
                            setLogin(true)
                          );
                        }}
                      >
                        Register
                      </button>
                      <button
                        onClick={() => {
                          setLogin(true);
                        }}
                        className={styles.loginbutton}
                      >
                        Login instead
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
