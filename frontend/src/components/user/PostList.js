import React from 'react'
import { getPostsSingleUser } from './apiUser'
import { isAuthenticated } from '../../auth'
import defaultProfile from '../../images/defaultProfile.png'
import umbrella from '../../images/umbrella.jpg';

import { Link } from 'react-router-dom'


const PostListComponent = ({posts}) => {

  
  console.warn(posts)

  const postsByUser = posts => {
    return (
      posts.map( post => {
        return (
          <Link to={`/post/${post._id}`} className="amber-text"  key={post._id}>
            <li className="collection-item avatar" style={{"paddingLeft": "1.5rem"}}>
              <img style={{"paddingRight": "0.5rem"}, {"paddingTop": "1rem"}, {"borderRadius": "50%"}} className="responsive-img left" width="40"  onError={i => i.target.src = `${umbrella}`}  src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`} alt="" />
              <span style={{"paddingLeft": "1rem"}} className="title">{post.title}</span>
              <span href="" className="secondary-content  btn-floating  z-depth-0" >
                <i className="material-icons grey lighten-3 amber-text text-darken-2  ">visibility</i>
              </span>
            </li> 
          </Link>
        )
      })
    )
  }

    return (
      <div>
      <div className="collections">
          <ul className="collection with-header ">
            <li className="collection-header "><h5 className="amber-text background-light-karoo">Posts</h5></li>
            {postsByUser(posts)}
          </ul>
        </div>
      </div>
    )
}


export default PostListComponent