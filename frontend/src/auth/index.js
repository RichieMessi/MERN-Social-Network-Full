require('dotenv').config()
export const signup = (user) => {
  
    return fetch(`${process.env.REACT_APP_API_URL}/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .catch(err => console.warn(err))
  }

  export const signin = (user) => {
    return fetch(`${process.env.REACT_APP_API_URL}/signin`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .catch(err => console.warn(err))
  }

  export const authenticate = (jwt, next) => {
    if(typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(jwt))
        setTimeout(() => {
            next()
        }, 3000);
    }
  }


  export const signOut = (next) => {
    if(typeof window !== 'undefined') {
      localStorage.removeItem('jwt')
      next()
      return fetch(`${process.env.REACT_APP_API_URL}/signout`, {
        method: 'GET'
      })
      .then(res => {
        console.warn(res)
        return res.json()
      })
      .catch(err => console.warn(err))
    }
  }
  
  export const isAuthenticated = () => {
  
    if(typeof window == 'undefined') {
      return false
    }
  
    if(localStorage.getItem('jwt')) {
      return JSON.parse(localStorage.getItem('jwt'))
    } else {
      return false
    }
  }