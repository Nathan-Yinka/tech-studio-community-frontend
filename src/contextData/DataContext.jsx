import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext();

const DataContext = ({children}) => {
    const apiURL = "https://techstudiocommunity.onrender.com";
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [communityData, setCommunityData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      fetch(`${apiURL}/api/users/community/`)
        .then((response) => response.json())
        .then((result) => {
          setCommunityData(result);
        })
        .catch((error) => {
          console.log(error);
          window.location.reload();
        })
        .finally(() => {
          setLoading(false);
        });
    }, []);

    const login = (userToken) => {
        setToken(userToken);
        localStorage.setItem('token', userToken);
      };

      const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
      };

    const utilis = {
        token,
        login,
        logout,
        communityData,
        loading,
        apiURL,
    }

  return (
    <AuthContext.Provider value={utilis}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
    return useContext(AuthContext);
  }

export { DataContext, useAuth };