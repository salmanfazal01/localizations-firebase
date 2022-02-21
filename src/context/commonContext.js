import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { createContext, useEffect, useState } from "react";
import { db } from "../config/firebase";

const COMMON_CONTEXT_STORAGE = "LOCALES_COMMON_STORAGE_PERSIST";

// Create Context Object
export const CommonContext = createContext({});

// Create a provider for components to consume and subscribe to changes
export const CommonContextProvider = ({ initialState = {}, children }) => {
  const [state, setState] = useState({ ...initialState, selectedTab: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const _data = window.localStorage.getItem(COMMON_CONTEXT_STORAGE);
      const parsed = _data ? JSON.parse(_data) : {};
      setState((old) => ({ ...old, ...parsed }));
    }
    setIsLoading(false);
  }, []);

  // Listen to locales on db
  useEffect(() => {
    const q = query(collection(db, "locales"), orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setCommonState({ locales: list, localesString: list.toString() });
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && !isLoading) {
      const parsed = JSON.stringify(state);
      window.localStorage.setItem(COMMON_CONTEXT_STORAGE, parsed);
    }
  }, [state, isLoading]);

  const setCommonState = (data = {}) => {
    setState((old) => ({
      ...old,
      ...data,
    }));
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <CommonContext.Provider value={{ commonState: state, setCommonState }}>
      {children}
    </CommonContext.Provider>
  );
};
