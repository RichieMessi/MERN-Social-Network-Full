export const create = (userId, token, post) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/new/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: post
    })
    .then(res => res.json())
    .catch(err => console.warn(err))
}

export const list = () => {
    return fetch(`${process.env.REACT_APP_API_URL}`, {
      method: 'GET',
    })
    .then(res => res.json())
    .catch(err => console.warn(err))
}

export const readSinglePost = (postId) => {
      return fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      })
      .then(res => res.json())
      .catch(err => console.warn(err))
    }


export const remove = (postId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .catch(err => console.warn(err))
  }
  

export const update = (postId, token, post) => {
  return fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: post
  })
  .then(res => res.json())
  .catch(err => console.warn(err))
}

// export const updatePost = (user, next) => {
//   if(typeof window !== 'undefined') {
//     if(localStorage.getItem('jwt')) {
//       let auth = JSON.parse(localStorage.getItem('jwt'))
//         auth.user = user
//         localStorage.setItem('jwt', JSON.stringify(auth))
//         next()
//     }
//   }
// }


export const read = (postId, token) => {
  return fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`, {
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



// export const updatePost = () => {
//   console.warn('updatePost RAN')
// }

     

export const like = (userId, token, postId) => {
  return fetch(`${process.env.REACT_APP_API_URL}/post/like`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({userId, postId})
  })
  .then(res => res.json())
  .catch(err => console.warn(err))
}



export const unlike = (userId, token, postId) => {
  return fetch(`${process.env.REACT_APP_API_URL}/post/unlike`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({userId, postId})
  })
  .then(res => res.json())
  .catch(err => console.warn(err))
}

export const comment = (userId, token, postId, comment) => {
 
  console.warn(comment)
  return fetch(`${process.env.REACT_APP_API_URL}/post/comment`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({userId, postId, comment})
  })
  .then(res => res.json())
  .catch(err => console.warn(err))
}



export const uncomment = (userId, token, postId, comment) => {
  console.warn('UNCOMENT RAN')
  console.warn(userId, token, postId, comment)
  return fetch(`${process.env.REACT_APP_API_URL}/post/uncomment`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({userId, postId, comment})
  })
  .then(res => res.json())
  .catch(err => console.warn(err))
}