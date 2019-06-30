import React, { Component } from 'react'
import { isAuthenticated } from '../../auth'
import { create }  from './apiPost'
import { Redirect } from 'react-router-dom'
import defaultProfile from '../../images/defaultProfile.png'


class NewPostFormComponent extends Component {

  constructor() {
    super()
    this.state = {
      title: "",
      body: "",
      photo: "",
      error: "",
      error: "",
      user: {},
      open: false,
      redirectToProfile: false,
      loading: false,
      fileSize: 0
    }
  }


  componentDidMount() {
    this.postData = new FormData()

    this.setState({
      user: isAuthenticated().user
    })

  }

  handleChange = name => event => {
    this.setState({error: ""})
    const value = name === 'photo' ? event.target.files[0] : event.target.value
    const fileSize = name === 'photo' ? event.target.files[0].size : 0
    this.postData.set(name, value)
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
    
    create(this.state.user._id, isAuthenticated().token, this.postData)
      .then(data => {
        if(data.error) {
          this.setState({
            error: data.error
          })
        } else {
          console.warn(this.state)
            setTimeout(() => {
              this.setState({
                title: "",
                body: "",
                photo: "",
                error: "",
                user: {},
                fileSize: 0,
                loading: false,
                redirectToProfile: true,
                open: true
              })
              if(this.state.open) {
                window.M.toast({html: 'Post Uploaded', displayLength: 4000})
              }
            }, 2000);
        }
      }
      )
  }


  render() {
    const { name, email, redirectToProfile } = this.state
    const { loading } = this.state
    if(redirectToProfile) {
      return <Redirect to={`/user/${isAuthenticated().user._id}`}></Redirect>
    }
    if(this.state.redirectToProfile) {
    }
    

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
            <div className="card grey lighten-5 z-depth-0">
              <div className="container">
                <br/><br/>
              </div>
              <div className="card-content">
                <form onSubmit={this.handleSubmit} className=" ">
            <h4 className="amber-text">Create Post</h4>
            <br/><br/>
                  <div className="row">
                    <input type="file" className="" onChange={this.handleChange("photo")}  accept="image/*" name="photo" id="photo"/>
                    {this.state.fileSize > 100000 ? ( <div className="red-text">File Size should be less than 100kb</div>) : null}
                  </div>

                  <div className="row">
                    <div className="input-field col s12">
                      <div className="amber-text">Post Title</div>
                      <input placeholder={this.state.name} onChange={this.handleChange("title")}  name="title"  id="title" type="text" />
                      {/* {this.state.name === "" && this.state.error ? (<div className="red-text">Name cannot be empty</div>) : null} */}
                    </div>
                  </div>

                  <div className="row">
                    <input-field className="col s12">
                      <div className="amber-text">Post Body</div>
                      <textarea onChange={this.handleChange("body")} id="body" className="materialize-textarea"></textarea>
                    </input-field>
                  </div>
                  <input type="submit" value="Create Post" className="btn amber z-depth-0" />
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


export default NewPostFormComponent