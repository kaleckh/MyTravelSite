import styles from "./Home.module.css";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

import { auth } from "./Firebase";
import Header from "./pieces/Header";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";

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
      const loggedUser = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      localStorage.setItem(`userEmail`, `${auth.currentUser.email}`);
      return loggedUser
    } catch (error) {
      console.log(error.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

 
  const handleSubmit = async () => {
    try {
      return await axios.post("http://localhost:3001/newperson", {
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
            <Header />
            <div className={styles.mainContainer}>
              <div className={styles.mainBox}>
                <div className={styles.homeTitle}>
                  Meet cool people and travel the world
                </div>
                <div className={styles.buttonContainer}>
                  <button
                    onClick={() => {
                      
                      sethomeScreen(false);
                      setLogin(true);
                    }}
                  >
                    Login
                  </button>
                  <button
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
              <div className={styles.leftSideInput}></div>
              {loginToggle ? (
                <div className={styles.inputContainer}>
                  <div className={styles.words}>Welcome Back!</div>
                  <div className={styles.row}></div>
                  <input
                    onChange={(event) => {
                      setLoginEmail(event.target.value);
                    }}
                    placeholder="email"
                    type="text"
                  />
                  <input
                    onChange={(event) => {
                      setLoginPassword(event.target.value);
                    }}
                    placeholder="password"
                    type="password"
                  />

                  <div>
                    <button
                      className={styles.color}
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
                      className={styles.color}
                    >
                      Login
                    </button>
                  </div>
                </div>
              ) : (
                <div className={styles.inputContainer}>
                  <div className={styles.words}>Welcome</div>
                  <div className={styles.row}>
                    <input
                      onChange={(event) => {
                        setFirstName(event.target.value);
                      }}
                      placeholder="first name"
                      type="text"
                    />
                    <input placeholder="last name" type="text" />
                  </div>
                  <input
                    onChange={(event) => {
                      setRegisterEmail(event.target.value);
                    }}
                    placeholder="email"
                    type="text"
                  />
                  <input
                    onChange={(event) => {
                      setRegisterPassword(event.target.value);
                    }}
                    placeholder="password"
                    type="password"
                  />
                  <input placeholder="confirm password" type="password" />
                  <div>
                    <button
                      className={styles.color}
                      onClick={() => {
                        Promise.all([register(), handleSubmit()]).then(setLogin(true));
                      }}
                    >
                      Register
                    </button>
                    <button
                      onClick={() => {
                        setLogin(true);
                      }}
                      className={styles.color}
                    >
                      Login instead
                    </button>
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
