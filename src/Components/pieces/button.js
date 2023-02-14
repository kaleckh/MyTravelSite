import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { auth } from "../Firebase";
import { signOut } from "firebase/auth";

export default function Header({}) {
  const navigate = useNavigate();
  const logout = async () => {
    const [toggle, setToggle] = useState(false);
    await signOut(auth);
  };

  return (
    <div>
      {toggle ? (
        <button
          onClick={() => {
            uploadFile(selectedFile);
            setToggle(false)
          }}
        >
          button
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}
