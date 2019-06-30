import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { list, getUserPhoto } from './apiUser'
import { isAuthenticated } from '../../auth'

import defaultProfile from '../../images/defaultProfile.png'

class UsersComponent extends Component {

    constructor() {
        super()
        this.state = {
            users: [],
            userPhoto: [],
            error: []
        }
    }

    componentDidMount() {
        list()
        .then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                this.setState({
                    users: data
                })
            }
        })
    }

    renderUsers = users => {
        return (
            users.map(user => {
                var photoUrl = user._id ? `${process.env.REACT_APP_API_URL}/user/photo/${user._id}?${new Date().getTime()}` : defaultProfile
                  return (
                      <div key={user._id}>
                          <Link to={`/user/${user._id}`}>
                  <div className="card z-depth-0 grey lighten-5">
                      <div className="card-content">
                          <img className="responsive-img circle right userListPhoto" width="40" src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`} onError={i => i.target.src = `${defaultProfile}`} />
                          <h5 className="amber-text"> {user.name}</h5>
                          <br/>
                            <div className="chip boo amber-text text-darken-2">
                              <i className="material-icons  amber-text tiny right foo">person</i>
                              <span href="#" className=" ">View Profile</span>
                            </div>
                      </div>
                      </div>
                          </Link>
                  </div>
                  )
              })
        )
    }

  render() {
      const { users } = this.state
      console.warn(users);
    //   const user = 
    return (
        <div className="container">
            <br/><br/><br/>
            {/* <p className="amber-text">{JSON.stringify(users)}</p> */}
            <div className="row">
                <div className="col s5">
                    { this.renderUsers(users) }
                </div>
            </div>
            <br/><br/>
        </div>

    )
  }
}



export default UsersComponent