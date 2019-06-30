import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { update, read, updatePost }  from './apiPost'
import { isAuthenticated } from '../../auth'

import defaultProfile from '../../images/defaultProfile.png'

class EditPostFormComponent extends Component {

    constructor() {
        super()
        this.state = {
            id: "",
            title: "",
            body: "",
            error: "",
            redirect: false,
            open: false,
            loading: false,
            fileSize: 0
        }
  }
  
  componentDidMount() {
    console.warn(this.props)
    this.postData = new FormData()
    this.postId = this.props.match.params.postId
    console.warn(this.props)
    read(this.postId, isAuthenticated().token)
        .then(data => {
            if(data.error) {
                this.setState({
                    error: data.error
                })
            } else {
                this.setState({
                    id: data._id,
                    title: data.title,
                    body: data.body
                })
            }
        })

  }

  // componentWillReceiveProps(props) {
  //   console.warn(props)
  //   this.setState({
  //     name: props.name,
  //     email: props.email
  //   })
  // }

  init = postId => {
    const token = isAuthenticated().token
    read(postId, token)
    .then(data => this.setState({redirect: true}))
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
    const {title, body} = this.state
    const post = {title: title, body: body}
    // console.warn(user)
    console.warn(this.postData)
    

    update(this.postId, isAuthenticated().token, this.postData)
      .then(data => {
        if(data.error) {
          this.setState({
            error: data.error
          })
          console.warn(this.state.error)
        } else {
          this.setState({
            loading: true
          })
            // setTimeout(() => {
              this.setState({
                id: "",
                title: "",
                body: "",
                loading: true,
                open: true,
                redirect: true
              })
              if(this.state.open) {
                window.M.toast({html: 'Post Updated', displayLength: 4000})
              }
            // }, 2000);
        }
      }
      )
  }


  render() {
    const { loading } = this.state
    console.warn(this.state)
    if(this.state.redirect) {
      return <Redirect to={`/post/${this.postId}`}></Redirect>
    }

    const photoUrl = this.state.id? `${process.env.REACT_APP_API_URL}/post/photo/${this.state.id}?${new Date().getTime()}` : defaultProfile
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
              <img src={photoUrl} className="responsive-img meriphoto" width="" alt={this.state.title}/>
              </div>
              <div className="card-content">
                <form onSubmit={this.handleSubmit} className="">
            <h4 className="amber-text">Edit Post</h4>
            <br/><br/>
                  <div className="row">
   
                    <input type="file" className="" onChange={this.handleChange("photo")}  accept="image/*" name="photo" id="photo"/>
                    {this.state.fileSize > 100000 ? ( <div className="red-text">File Size should be less than 100kb</div>) : null}
                  </div>

                  <div className="row">
                    <div className="input-field col s12">
                      <div className="amber-text">Post Title</div>
                      <input onChange={this.handleChange("title")}  value={this.state.title} name="title" type="text" id="title" />
                      {/* {this.state.email === "" && this.state.error ? (<div className="red-text">{this.state.error}</div>) : null} */}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s12">
                      <div className="amber-text">Post Body</div>
                      <textarea onChange={this.handleChange("body")} value={this.state.body} id="body" className="materialize-textarea"></textarea>
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


export default EditPostFormComponent