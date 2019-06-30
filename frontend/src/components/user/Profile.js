import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom'
import { isAuthenticated } from '../../auth'
import { read, getPostsSingleUser } from './apiUser'

import trollfaceeditted from '../../images/trollfaceeditted.png'
import defaultProfile from '../../images/defaultProfile.png'
import DeleteUserComponent from './DeleteUser'
import EditProfileComponent from './EditProfile'
import FollowButtonComponent from './Follow'
import FollowingListComponent from './FollowingList'
import FollowersListComponent from './FollowersList'
import PostListComponent from './PostList'

class ProfileComponent extends Component {

  constructor() {
    super()
    this.state = {
      user: {
        following: [],
        followers: []
      },
      redirectToSignIn: false,
      followingState: false,
      error: '',
      posts: []
    }
  }

// check follow
checkFollow = user => {
  const jwt = isAuthenticated()
  const match = user.followers.find(follower => {
    // one id has many other ids (followers) and vice versa
      return follower._id === jwt.user._id

  })
  return match
}

clickFollowButton = callApi => {
  const userId = isAuthenticated().user._id
  // const userId = this.props.match.params.userId
  const token = isAuthenticated().token

  callApi(userId, token, this.state.user._id)
  .then(data => {
    if(data.error) {
      this.setState({error: data.error})
    } else {
      this.setState({user: data, followingState: !this.state.followingState})
    }
  })
}
  

  init = (userId) => {
    const token = isAuthenticated().token
    read(userId, token)
    .then(data => {
      if(data.error) {
        this.setState((state, props) => {
          return {
            redirectToSignIn: true
          }
        })
      } else {
        let followingState = this.checkFollow(data)
        this.loadPosts(data._id)
        this.setState({
            user: data,
            followingState: followingState
        })
      }
    })
  }

  loadPosts = userId => {
    let token = isAuthenticated().token
    getPostsSingleUser(userId, token)
    .then(data => {
      if(data.error) {
        this.setState({
          erro: data.error
        })
      } else {
        this.setState({
          posts: data
        })
      }
    })

  }

  componentDidMount() {
    const userId = this.props.match.params.userId
    this.init(userId)
  }

  componentWillReceiveProps(nextProps) {
    const userId = nextProps.match.params.userId
    // alert(userId)
    this.init(userId)
    // console.warn('ini ran AGAIN===========================================')
  }

  render() {
    const userId = this.props.match.params.userId
    const redirectToSignIn = this.state.redirectToSignIn
    // console.warn(this.state.user.following)
    // console.warn(this.state.user.followers)
    console.warn(this.state)
    if(redirectToSignIn) {
      return <Redirect to="/signin"></Redirect>
    }
    const photoUrl = userId ? `${process.env.REACT_APP_API_URL}/user/photo/${userId}?${new Date().getTime()}` : defaultProfile
    return (
      <div>
        <div className="container">
          {/* <br/><br/><br/> */}
          <br/>
          <div className="row">
            <div className="col s12">
              <div className="card background-light-karo cancel-margin-bottom  z-depth-0">
                <div className="card-content">
                <div className="containerr">
                  <div className="row">
                    <div className="col s6">
                <img src={photoUrl} className="responsive-img meriphoto" onError={i => i.target.src = `${defaultProfile}`} />
                    </div>
                    <div className="col s5">
                        <div className="card background-light-karo z-depth-0">
                          <div className="card-content background-light-karo">
                          <p className=" z-depth-0 lighten-4 amber-text text-darken-2 ">User - {this.state.user.name}</p>
                          <p className=" z-depth-0 lighten-4 amber-text text-darken-2">Email - {this.state.user.email}</p>
                          <p className=" z-depth-0 lighten-4 amber-text text-darken-2">Joined - {`${new Date(this.state.user.created_at).toDateString()}`}</p>
                      {
                        (
                          isAuthenticated().user && isAuthenticated().user._id === this.state.user._id
                        )
                        ?
                        (
                          <div className="card-content">
                            <Link to={`/user/edit/${userId}`}>
                            <div className="chip hoverColor left">
                              <span href="#" className="amber-text text-darken-2 "> Edit</span>
                              <i className="material-icons  amber-text tiny right foo">edit</i>
                            </div>
                          </Link>
                            <DeleteUserComponent userId={this.state.user._id} />
                          </div>
                        )
                        :
                          <FollowButtonComponent following={this.state.followingState} onButtonClicked={this.clickFollowButton}/>
                      }
                          </div>
                        </div>
                    </div>
                  </div>
                </div>
                <hr className="amber-text"/>
                <p className="orange-text">{this.state.user.bio}</p>
                </div>
              </div>
              <div className="card z-depth-0  background-light-karo cancel-margin-top">
              </div>
              </div>
          <div className="col s4 offset-s2">
            <div className="card background-light-karo z-depth-0">
            

              </div>
          </div>
          </div>

          <div className="row">
            <div className="col s12">
              <div className="row">
                <div className="col s12 m4">
                  <PostListComponent posts={this.state.posts} />
                </div>
                <div className="col s12 m4">
                  <FollowersListComponent followersList={this.state.user.followers} />
                </div>
                <div className="col s12 m4">
                  <FollowingListComponent followingList={this.state.user.following}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}




export default ProfileComponent