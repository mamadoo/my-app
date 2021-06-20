import React, { useState, useContext, createContext } from "react";
import axios from 'axios';

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signin = ({ email, password }) => {
    return new Promise((resolve, reject) => {
      axios.post('https://reqres.in/api/login', { email, password })
        .then(response => {
          if (response.data.token) {
            const toBeLoggedInUser = {
              email,
              password,
            };

            setUser(toBeLoggedInUser);
            resolve(toBeLoggedInUser);
          } else {
            reject('Login failed. please try again.');
          }
        })
        .catch(error => {
          let errorMessage = '';

          if (error.response && (error.response.status === 400 || error.response.status === 401)){
            errorMessage = error.response.data.error;
          } else {
            errorMessage = 'Something went wrong. Please try again later.';
          }

          reject(errorMessage);
        });
    });
  };

  const signout = () => {
    setUser(null);
  };

  return {
    user,
    signin,
    signout,
  };
}
