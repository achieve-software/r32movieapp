import React, { createContext, useEffect, useState } from "react";
import { auth } from "../auth/firebase";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

// export const {Provider} = createContext()
export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem("user")) || false);

  const navigate = useNavigate();
  useEffect(() => {
    userObserver();
  }, []);
  const createUser = async (email, password, displayName) => {
    try {
      let userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(auth.currentUser,{
        displayName:displayName,
      })
      console.log(userCredential);
      navigate("/");
      toastSuccessNotify("Registered successfully!");
    } catch (error) {
      // console.log(error);
      toastErrorNotify(error.message);
    }
  };

  //* https://console.firebase.google.com/
  //* => Authentication => sign-in-method => enable Email/password
  //! Email/password ile girişi enable yap

  const signIn = async (email, password) => {
    //? mevcut kullanıcının giriş yapması için kullanılan firebase metodu
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
      toastSuccessNotify("Logged in successfully!");
    } catch (error) {
      //  console.log(error);
      toastErrorNotify(error.message);
    }
  };

  const logOut = () => {
    signOut(auth);
  };
  const userObserver = () => {
    //? Kullanıcının signin olup olmadığını takip eden ve kullanıcı değiştiğinde yeni kullanıcıyı response olarak dönen firebase metodu
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email, displayName, photoURL } = user;
        setCurrentUser({ email, displayName, photoURL });
        sessionStorage.setItem(
          "user",
          JSON.stringify({ email, displayName, photoURL })
        );

        //  console.log(user);
      } else {
        setCurrentUser(false);
        // console.log("logged out");
      }
    });
  };


  //* https://console.firebase.google.com/
  //* => Authentication => sign-in-method => enable Google
  //! Google ile girişi enable yap
  //* => Authentication => settings => Authorized domains => add domain
  //! Projeyi deploy ettikten sonra google sign-in çalışması için domain listesine deploy linkini ekle
  const signUpProvider = () => {
    //? Google ile giriş yapılması için kullanılan firebase metodu
    const provider = new GoogleAuthProvider();
    //? Açılır pencere ile giriş yapılması için kullanılan firebase metodu
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        navigate("/");
        toastSuccessNotify("Logged in successfully!");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const values = {
    signUpProvider,
    userObserver,
    logOut,
    signIn,
    createUser,
    currentUser,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
