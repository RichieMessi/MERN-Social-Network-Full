import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { read } from './apiUser'
import { isAuthenticated } from '../../auth'



class EditProfileComponent extends Component {

    state = {
        name: "",
        email: "",
        password: ""
    }
    
    // init = userId => {
    //     // const tok
    // }

  render() {
      // console.warn(isAuthenticated().user._id)
      // console.warn(this.props.userId)
    return (
      <div>
            <div className="chip boo">
                <span href="#" className="amber-text text-darken-2 boo"> Edit</span>
                <i className="material-icons  amber-text tiny right foo">edit</i>
            </div>
      </div>
    )
  }
}


export default EditProfileComponent