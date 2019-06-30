import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { update, read, updateUser }  from './apiUser'
import { isAuthenticated } from '../../auth'

import defaultProfile from '../../images/defaultProfile.png'

class EditProfileFormComponent extends Component {

  userId
  constructor() {
    super()
    this.state = {
      name: "",
      email: "",
      password: "",
      bio: "",
      error: "",
      redirectToProfile: false,
      open: false,
      loading: false,
      fileSize: 0
    }
    // const userId = this.props.match.params.userId
    
  }
  
  componentDidMount() {
    console.warn(this.props)
    this.userData = new FormData()
    this.userId = this.props.match.params.userId
    read(this.userId, isAuthenticated().token)
    .then((data) => {
      this.setState({
        name: data.name,
        email: data.email,
        bio: data.bio
      })
    })
  }

  // componentWillReceiveProps(props) {
  //   console.warn(props)
  //   this.setState({
  //     name: props.name,
  //     email: props.email
  //   })
  // }

  init = userId => {
    const token = isAuthenticated().token
    read(userId, token)
    .then(data => this.setState({redirectToProfile: true}))
  }


  handleChange = name => event => {
    this.setState({error: ""})
    // this.userData.set([e.target.id], value)
    // this.setState({
    //   [e.target.id]: value
    // })
    const value = name === 'photo' ? event.target.files[0] : event.target.value
    const fileSize = name === 'photo' ? event.target.files[0].size : 0
    this.userData.set(name, value)
    this.setState({
      [name]: value,
      fileSize: fileSize
    })
  }

  handleSubmit = (e) => {
    this.setState({
      loading: true,
      error: ""
    })
    e.preventDefault()  
    const {name, email, bio} = this.state
    const user = {name: name, email: email, bio}
    console.warn(this.state)
    

    update(this.userId, isAuthenticated().token, this.userData)
      .then(data => {
        if(data.error) {
          this.setState({
            error: data.error
          })
          console.warn(this.state.error)
        } else {
          updateUser(data, () => {
            setTimeout(() => {
              this.setState({
                name: "",
                email: "",
                password: "",
                bio: "",
                error: "",
                open: true
              })
              this.setState({
                loading: false,
                redirectToProfile: true
              })
              if(this.state.open) {
                window.M.toast({html: 'Profile Updated', displayLength: 4000})
              }
            }, 2000);
          })
        }
      }
      )
  }


  render() {
    const { loading } = this.state
    if(this.state.redirectToProfile) {
      return <Redirect to={`/user/${this.props.match.params.userId}`}></Redirect>
    }

    const userId = this.props.match.params.userId
    // const photoUrl = userId ? `${process.env.REACT_APP_API_URL}/user/photo/${userId}` : defaultProfile
    const photoUrl = userId ? `${process.env.REACT_APP_API_URL}/user/photo/${userId}?${new Date().getTime()}` : defaultProfile
    return (
       <div>
        <div className="row">
      {
                loading ? (  <div className="progress loadingBar "> 
            <div className="indeterminate "></div>
            </div>) : (" ")
      }
          <div className="col s7">
          <div className="container">
            <br/><br/>
                      {/* {this.state.error ?<div className="red-text">{this.state.error}</div>: null} */}
            <div className="card grey lighten-5 z-depth-0">
              <div className="container">
                <br/><br/>
              <img src={photoUrl} className="responsive-img meriphoto" width="" alt={this.state.name}/>
              </div>
              <div className="card-content">
                <form onSubmit={this.handleSubmit} className=" ">
            <h4 className="amber-text">Edit Profile</h4>
            <br/><br/>
                  <div className="row">
                    {/* <div className="file-field input-field">
                      <div className="btn indigo z-depth-0">
                        <span>Upload Picture</span>
                        <i className="material-icons">add</i>
                        <input onChange={this.handleChange}  accept="image/*" type="file" name="photo" id="photo"/>
                      </div>
                      <div className="file-path-wrapper">
                        <input  placeholder="UPLOAD PHOTO" type="text" name="photo" id="photo" className="file-path"/>
                      </div>
                    </div> */}
                    <input type="file" className="" onChange={this.handleChange("photo")}  accept="image/*" name="photo" id="photo"/>
                    {this.state.fileSize > 100000 ? ( <div className="red-text">File Size should be less than 100kb</div>) : null}
                  </div>

                  <div className="row">
                    <div className="input-field col s12">
                      <div className="amber-text">Name</div>
                      <input placeholder={this.state.name} onChange={this.handleChange("name")} value={this.state.name} name="name"  id="name" type="text" />
                      {/* <label htmlFor="name">Name</label> */}
                      {this.state.name === "" && this.state.error ? (<div className="red-text">Name cannot be empty</div>) : null}
                    </div>
                  </div>

                  <div className="row">
                    <div className="input-field col s12">
                      <div className="amber-text">Email</div>
                      <input onChange={this.handleChange("email")} placeholder={this.state.email} value={this.state.email} name="email" type="email" id="email" />
                      {/* <label htmlFor="email">Email</label> */}
                      {this.state.email === "" && this.state.error ? (<div className="red-text">{this.state.error}</div>) : null}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s12">
                      <div className="amber-text">TextArea</div>
                      <textarea onChange={this.handleChange("bio")} id="bio" value={this.state.bio} className="materialize-textarea">{this.state.bio}</textarea>
                    </div>
                  </div>
                  <input type="submit" value="Update" className="btn amber z-depth-0" />
                </form>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    )
  }
}


export default EditProfileFormComponent