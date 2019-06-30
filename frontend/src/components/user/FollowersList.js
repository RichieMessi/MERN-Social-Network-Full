import React, { Component } from 'react'
import defaultProfile from '../../images/defaultProfile.png'
import { Link } from 'react-router-dom'

class FollowersListComponent extends Component {
  render() {
    return (
      <div>
      <div className="collections grey lighten-1">
          <ul className="collection with-header  grey lighten-1">
            <li className="collection-header"><h5 className="amber-text">Followers</h5></li>
            {
              this.props.followersList
              ?
              (
                this.props.followersList.map((user, key) => {
                  return (
                    <Link to={`/user/${user._id}`} className="amber-text"  key={key}>
                      <li className="collection-item avatar" style={{"paddingLeft": "1.5rem"}}>
                        <img style={{"paddingRight": "0.5rem"}, {"paddingTop": "1rem"}, {"borderRadius": "50%"}} className="responsive-img left" width="40"  onError={i => i.target.src = `${defaultProfile}`}  src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`} alt="" />
                        <span style={{"paddingLeft": "1rem"}} className="title">{user.name}</span>
                        <span href="" className="secondary-content  btn-floating  z-depth-0" >
                          <i className="material-icons grey lighten-3 amber-text text-darken-2  ">visibility</i>
                        </span>
                      </li> 
                    </Link>
                  )
                })
              )
              :
              (
                <>
                <div className="red-text">Loading............</div>
                </>
              )
            }
            {/* <li className="collection-item avatar">
              <i className="material-icons circle amber">person</i>
              <span className="title">Richie</span>
              <p className="grey-text">User Profile</p>
              <a href="" className="secondary-content  btn-floating  z-depth-0" >
                <i className="material-icons grey lighten-3 amber-text text-darken-2  ">email</i>
              </a>
          </li> */}
          <li className="collection-item">
            {/* {JSON.stringify(this.props.followersList)} */}
          </li>
          </ul>
        </div>
      </div>
    )
  }
}


export default FollowersListComponent