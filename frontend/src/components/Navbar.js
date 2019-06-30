import React from 'react'
import { Link, withRouter } from 'react-router-dom'

import { signOut, isAuthenticated } from '../auth'
import defaultProfile from '../images/defaultProfile.png'


const isActive = (history, path) => {
   if(history.location.pathname === path) {
       return {color: '#ff9900'}
   } else {
      return {color: '#ffffff'}
    }
}


const NavbarComponent = ({history}) => {
  return (
      <div className="">
    <nav className="z-depth-0 grey darken-4">
        <div className="container">
    <div className="nav-wrapper">
      <span style={{cursor: "pointer"}} data-target="mobile-demo" className="sidenav-trigger show-on-small"><i className="material-icons">menu</i></span>
      <ul className="right hide-on-med-and-down">
        <>
        <li>
            <Link className="nav-link" style={isActive(history, "/")} to="/">Posts</Link>
        </li>
        <li>
            <Link className="nav-link" style={isActive(history, "/users")} to="/users">Users</Link>
        </li>
        
        </>
        {
          isAuthenticated()
          ?
          <>
        <li>
          <Link style={isActive(history, "/post/create")} to={`/post/create`} >Create Post</Link>
        </li>
        <li className="nav-link">
          <Link  className="btn-floating amber darken-3 pulse" to={`/user/${isAuthenticated().user._id}`} ><i className="material-icons">person</i>
          </Link>
        </li>
        <li>
          <Link to={`/user/${isAuthenticated().user._id}`} >
            <span style={{color: 'orange'}}  >{isAuthenticated().user.name}'s profile</span>
          </Link>
        </li>

        


        <li className="nav-link">
          <Link to={`/signin`}>
            <span onClick={() => signOut(() => history.push('/'))} >Sign Out</span>
          </Link>
        </li>
        </>
          :
          <>
       
        <li>
            <Link className="nav-link" style={isActive(history, "/signin")} to="/signin">Sign In</Link>
        </li>
        <li>
            <Link className="nav-link" style={isActive(history, "/signup")} to="/signup">Sign Up</Link>
        </li>
        </>
        }
      </ul>
    </div>
    </div>
  </nav>

          
  <ul className="sidenav fixed" id="mobile-demo">
        {/* <li>
        <div className="user-view ">
          <div className="background amber darken-3">
            <img src="./img/ship_bottle.jpg" alt="" />
          </div>
          <a href="#!"><span className="name white-text">John Doe</span></a>
          <a href="#!"><span className="email white-text">JDoe@gmail.com</span></a>
          <li className="active"><a href="/"><i className="material-icons">dashboard</i>Dashboard</a></li>
          <li><div className="divider"></div></li>
          <li className=""><a href="./posts.html"><i className="material-icons">local_post_office</i> Posts</a></li>
          <li className=""><a href="./categories.html"><i className="material-icons">category</i>Categories</a></li>
          <li className=""><a href="./comments.html"><i className="material-icons">comment</i>Comments</a></li>
          <li className=""><a href="./users.html"><i className="material-icons">face</i>Users</a></li>
          <li><div href="#!" className="divider"></div></li>
          <li><a href="#!" className="subheader">Account Controls</a></li>
          <li><a href="#!"><i className="material-icons">logout</i>Logout</a></li>
        </div>
    </li> */}
    <div className="user-view">
          <a href="#"><img src={defaultProfile} alt="" className="circle center-align" /></a>
          <div className="background amber darken-3">
            <img src="./img/ship_bottle.jpg" alt="" />
          </div>
          <a href="#!"><span className="name white-text">John Doe</span></a>
          <a href="#!"><span className="email white-text">JDoe@gmail.com</span></a>
          <li className="active"><a href="/"><i className="material-icons">dashboard</i>Dashboard</a></li>
          <li><div className="divider"></div></li>
          <li className=""><a href="./posts.html"><i className="material-icons">local_post_office</i> Posts</a></li>
          <li className=""><a href="./categories.html"><i className="material-icons">category</i>Categories</a></li>
          <li className=""><a href="./comments.html"><i className="material-icons">comment</i>Comments</a></li>
          <li className=""><a href="./users.html"><i className="material-icons">face</i>Users</a></li>
          <li><div href="#!" className="divider"></div></li>
          <li><a href="#!" className="subheader">Account Controls</a></li>
          <li><a href="#!"><i className="material-icons">logout</i>Logout</a></li>
          </div>
  </ul>
  </div>
  )
}


export default withRouter(NavbarComponent)