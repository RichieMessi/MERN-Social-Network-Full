import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import defaultProfile from '../../images/defaultProfile.png'

class FollowingListComponent extends Component {
  render() {
      // console.warn(this.props)
    return (
      <div>
      <div className="collections ">
          <ul className="collection with-header ">
            <li className="collection-header "><h5 className="amber-text background-light-karoo">Following</h5></li>
            {
              this.props.followingList
              ?
              (
                this.props.followingList.map((user, key) => {
                  {/* console.warn(user.id) */}
                  return (

                    <Link className="amber-text" to={`/user/${user._id}`}  key={key}>
                  <li className="collection-item avatar" style={{"paddingLeft": "1.5rem"}}>
                    <img style={ {"borderRadius": "50%"}} className="responsive-img left" width="40"  onError={i => i.target.src = `${defaultProfile}`}  src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`} alt="" />
                    <span className="amber-text" style={{"paddingLeft": "1rem"}} className="title">{user.name}</span>
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
          </ul>
        </div>
      </div>
    )
  }
}


export default FollowingListComponent