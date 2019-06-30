export const read = (userId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .catch(err => console.warn(err))
  }

  export const remove = (userId, token) => {
      return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => res.json())
      .catch(err => console.warn(err))
    }

  export const list = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/users`, {
      method: 'GET',
    })
    .then(res => res.json())
    .catch(err => console.warn(err))
  }

  // export const getUserPhoto = (userId) => {
  //   return fetch(`${process.env.REACT_APP_API_URL}/user/photo/${userId}`, {
  //     method: 'GET'
  //   })
  //   .then(res => res.json())
  //   .catch(err => console.warn(err))
  // }

  // export const update = (userId, token, user) => {
  //   console.warn(userId)
  //   console.warn(token)
  //   console.warn(user)
  //   return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
  //     method: 'PUT',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${token}`
  //     },
  //     body: JSON.stringify(user)
  //   })
  //   .then(res => res.json())
  //   .catch(err => console.warn(err))
  // }


  export const update = (userId, token, user) => {
    // alert(userId)
    // alert(token)
    // alert(JSON.stringify(user))
    return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: user
    })
    .then(res => res.json())
    .catch(err => console.warn(err))
  }


  export const updateUser = (user, next) => {
    if(typeof window !== 'undefined') {
      if(localStorage.getItem('jwt')) {
        let auth = JSON.parse(localStorage.getItem('jwt'))
          auth.user = user
          localStorage.setItem('jwt', JSON.stringify(auth))
          next()
      }
    }
  }



  
  export const follow = (userId, token, followId) => {
    console.warn(userId, followId)
    console.warn(JSON.stringify(userId, followId))
    console.warn(`${process.env.REACT_APP_API_URL}`)
    return fetch(`${process.env.REACT_APP_API_URL}/user/follow`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({userId, followId})
    })
    .then(res => res.json())
    .catch(err => console.warn(err))
  }


  export const unfollow = (userId, token, unfollowId) => {
    console.warn('================================')
    console.warn(unfollowId)
    console.warn('================================')
    return fetch(`${process.env.REACT_APP_API_URL}/user/unfollow`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({userId, unfollowId})
    })
    .then(res => res.json())
    .catch(err => console.warn(err))
  }

  export const getPostsSingleUser = (userId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/posts/by/${userId}`, {
      methods: 'GET'
    })
    .then(res => res.json())
    .catch(err => console.warn(err))
  }