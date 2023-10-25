import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const DataContext = ({children}) => {
    const apiURL = "https://techstudiocommunity.onrender.com";
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [communityData, setCommunityData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isLoggedIn,setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') || null);
    const [userDetails,setUserDetails] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
      setLoading(true)
      fetch(`${apiURL}/api/users/community/`)
        .then((response) => response.json())
        .then((result) => {
          setCommunityData(result);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }, []);

    useEffect(()=>{
      checkLoginStatus(token)
    },[token])


    const login = (userToken) => {
      setToken(userToken);
      localStorage.setItem('token', userToken);
    };

    const logout = () => {
      setToken(null);
      setIsLoggedIn(null)
      localStorage.removeItem('token');
      localStorage.removeItem('isLoggedIn');
      setLoading(false);
      window.location.reload()
    };

    function checkLoginStatus(token) {
      setLoading(true)
      if (token) {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
    
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
        };
    
        fetch(`${apiURL}/auth/user/`, requestOptions)
          .then(response => {
            if (response.ok) {
              return response.json()
            } else {
              throw new Error(`Request failed with status: ${response.status}`);
            }
          })
          .then(result => {
            login(token)
            localStorage.setItem('isLoggedIn', true);
            localStorage.setItem('userDetails', result);
            setIsLoggedIn(true)
            setUserDetails(result)
            setLoading(false)
          })
          .catch(error => {
            setIsLoggedIn(null)
            localStorage.setItem('isLoggedIn', null);
            setUserDetails({})
            setLoading(false)
          });
      }
    }

    const utilis = {
        token,
        login,
        logout,
        communityData,
        loading,
        apiURL,
        userDetails,
        isLoggedIn
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