import React, { createContext } from "react";
import { auth } from "../auth/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

// export const {Provider} = createContext()
export const AuthContext = createContext();


const AuthContextProvider = ({ children }) => {
  const navigate=useNavigate()
  const createUser = async (email, password) => {
    try {
      let userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential);
      navigate("/")
    } catch (error) {
      console.log(error);    }
  };
  const signIn = async (email,password) => {  
      //? mevcut kullanıcının giriş yapması için kullanılan firebase metodu
    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate("/")}
      
      catch (error) {
       console.log(error);}
    }


    const logOut = () => {
      signOut(auth)
    }

  const values = { logOut, signIn, createUser, currentUser: { displayName: "Alex Victor" } };  
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;