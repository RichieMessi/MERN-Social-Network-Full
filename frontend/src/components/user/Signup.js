import React, { Component } from 'react'
import { signup } from '../../auth'
import { Redirect } from 'react-router-dom'

class SignupComponent extends Component {

  state = {
    name: "",
    email: "",
    password: "",
    error: "",
    redirect: false,
    open: false,
    loading: false
  }

  handleChange = (e) => {
    this.setState({error: ""})
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {

    this.setState({
      loading: true
    })

    e.preventDefault()
    const {name, email, password} = this.state
    // console.warn(this.state)
    const user = {name: name, email: email, password: password}
    // console.warn(user)
    

    // if(this.state.error) {
    //   this.setState({
    //     loading: false
    //   })
    // }

    if(!this.state.error) {
      signup(user)
        .then(data => {
          if(data.error) {
            this.setState({
              error: data.error
            })
          } else {
            setTimeout(() => {
              this.setState({
                name: "",
                email: "",
                password: "",
                error: "",
                open: true,
                loading: true
              })
              this.setState({
                loading: false,
                redirect: true
              })
              if(this.state.open) {
                window.M.toast({html: 'New User Created', displayLength: 4000})
                window.M.toast({html: 'Please Sign In', displayLength: 4000})
              }
            }, 2000);
          }
        })
    }
  }




  render() {
    if(this.state.redirect) {
      return <Redirect to="/signin"></Redirect>
    }
    const { loading } = this.state
    return (
      <div>
      {
                loading ? (  <div className="progress loadingBar white"> 
            <div className="indeterminate "></div>
            </div>) : (" ")
      }
        <div className="row">
          <div className="col s7">
          <div className="container">
            <br/><br/>
            <div className="card grey lighten-5 z-depth-0">
              <div className="card-content">
                <div className="red-text">{this.state.error}</div>
                <form onSubmit={this.handleSubmit} className=" ">
            <h4 className="amber-text">Sign Up</h4>
                  <div className="row">
                    <div className="input-field col s12">
                      <input onChange={this.handleChange} value={this.state.name} name="name"  id="name" type="text" />
                      <label htmlFor="name">Name</label>
                    </div>
                  </div>

                  <div className="row">
                    <div className="input-field col s12">
                      <input onChange={this.handleChange} value={this.state.email} name="email" id="email" type="email"/>
                      <label htmlFor="email">Email</label>
                    </div>
                  </div>

                  <div className="row">
                    <div className="input-field col s12">
                      <input onChange={this.handleChange} value={this.state.password} name="password" id="password" type="password" />
                      <label htmlFor="password">Password</label>
                    </div>
                  </div>

                  <input type="submit" value="Submit" className="btn amber z-depth-0" />
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


export default SignupComponent