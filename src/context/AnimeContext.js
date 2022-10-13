import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  getDatabase,
  ref,
  set,
  get,
  child,
} from "firebase/database";

const AnimeContext = React.createContext();

const db = getDatabase();

export function useAuth() {
  return useContext(AnimeContext);
}

export default AnimeContext;

export function AnimeProvider({ children }) {
  // authentication
  const [currentUser, setCurrentUser] = useState();

  function signup(email, password) {
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return auth.signOut();
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  // realtime database .



  const getData = async (dataName) => {
    const dbref = ref(db);

    const data = [];
    try {
      const snapshot = await get(child(dbref, dataName));
      if (snapshot.exists) {
        snapshot.forEach((childSnapshot) => {
          data.push(childSnapshot.val());
        });
      } else {
        alert("No data found");
      }
    } catch (error) {
      console.log(error);
    }

    return data;
  };

  const getUser = async (email) => {
    try {
      const data = await getData("/Users");
      const user = data.find(u => u.email === email);
      return user;
    } catch (error) {
      alert(error);
    }
  }

  function selectData(path, name) {
    const dbref = ref(db);
    return get(child(dbref, path + name));
  }

  const insertData = async (path, name, data) => {
    await set(ref(db, path + name), data);
  }

  const insertUser = async (name, data) => {
    await set(ref(db, "Users/" + name), data);
  }

  const value = {
    currentUser,
    login,
    signup,
    logout,
    selectData,
    getData,
    getUser,
    insertUser,
    insertData,
  };

  return (
    <AnimeContext.Provider value={value}>{children}</AnimeContext.Provider>
  );
}


export function useAppContext() {
  return useContext(AnimeProvider);
}