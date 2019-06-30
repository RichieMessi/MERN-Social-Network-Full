import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { isAuthenticated } from '../../auth'

import { signin, authenticate } from '../../auth'


class SigninComponent extends Component {

  state = {
    email: "",
    password: "",
    error: "",
    redirect: false,
    loading: false
  }

  handleChange = (e) => {
    this.setState({error: ""})
    this.setState({
      [e.target.id]: e.target.value
    })
  }




  handleSubmit = (e) => {


      // this.setState({
      //   loading: true
      // })


    

    e.preventDefault()

    const {email, password} = this.state
    // console.warn(this.state)
    const user = {email: email, password: password}

    // console.warn(user)
    
    // setTimeout(() => {
    //   this.setState({
    //     loading: true,
    //     open: true
    //   })
    //   this.setState({
    //     loading: false,
    //     redirect: true
    //   })
    // }, 2000);

    // if(this.state.email !== "" || this.state.password !== "") {

      if(this.state.email == "") {
        this.setState({
          error: "Email must not be blank",
          laoding: false
        })
        return false
      }

      if(this.state.password == "") {
        this.setState({
          error: "Password must not be blank",
          loading: false
        })
        return false
      }
      signin(user)
        .then(data => {
          if(data.error) {
            this.setState({
              error: data.error,
              loading: false
            })
          } else {
            this.setState({
              loading: true
            })
            setTimeout(() => {
              authenticate(data, () => {
              this.setState({
                  redirect: true
              })
            })
            }, 2000)
          }
        })
  }

  render() {

      if(this.state.redirect) {
        window.M.toast({html: 'Sign In Successful', displayLength: 4000})
        // console.warn(`/user/${isAuthenticated().token}`)
        return <Redirect to={`/user/${isAuthenticated().user._id}`} />
      }

      const {loading} = this.state
      console.warn(loading)
      return (
        <div>
        { isAuthenticated() ? <Redirect to="/" /> : null}
              {
                  loading 
                  ? 
                  (  
                    <div className="progress loadingBar "> 
                      <div className="indeterminate"></div>
                    </div>
                  ) 
                  : 
                  (" ")
              }
                
            <div className="row">
              <div className="col s7">
              <div className="container">
              
              <br/><br/>
              
                <div className="card grey lighten-5 z-depth-0 ">
              <div className="row">
                <div className="">
                  <div className="card-content">

                    <form onSubmit={this.handleSubmit} className="">
                    <h4 className="amber-text">Sign In</h4>
                    {
                      this.state.error ? (<p className="red-text">{this.state.error}</p>) : null
                    }
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

            </div>
          </div>
          
    )
  }
}


export default SigninComponent