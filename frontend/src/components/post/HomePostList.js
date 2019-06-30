import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { list } from './apiPost'
import { isAuthenticated } from '../../auth'

import HomePostComponent from './HomePost'
import defaultProfile from '../../images/defaultProfile.png'
import pen from '../../images/pen.jpg';
import umbrella from '../../images/umbrella.jpg';
import demoPostImage from '../../images/demoPostImage.png'

class HomePostListComponent extends Component {

    constructor() {
        super()
        this.state = {
            posts: [],
            userPhoto: [],
            error: []
        }
    }

    componentDidMount() {
        list()
        .then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                this.setState({
                    posts: data
                })
            }
        })
    }

    render() {
      const { posts } = this.state
    return (
        <div className="col s6">
            <div className="row">
                <HomePostComponent posts={this.state.posts} />
            </div>
        </div>
    )
  }
}

export default HomePostListComponent