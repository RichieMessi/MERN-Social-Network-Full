import React, { Component } from 'react'
import { follow, unfollow } from './apiUser'
class FollowButtonComponent extends Component {
    
    
    followClick = () => {
        console.warn(this.props)
        this.props.onButtonClicked(follow) 
    }

    unfollowClick = () => {
        this.props.onButtonClicked(unfollow)
    }

    // componentWillReceiveProps(props) {
    //     const userId = props.match.params.userId
    //     this.init(userId)
    //     console.warn('ini ran AGAIN===========================================')
    //   }
    
    render() {
        // alert(this.props.following)
        // console.log(this.props.following)
        return (
            <div>
        {/* {
            !this.props.following
            ?
            (
            <div className="chip  grey lighten-2 hoverColor" onClick={this.followClick}>
                <span href="#" className="orange-text text-darken-2 "> Follow</span>
                <i className="material-icons  orange-text tiny right foo">person_add</i>
            </div>
            )
            :
            (
            <div className="chip  grey lighten-2 hoverColor" onClick={this.unfollowClick}>
                <span href="#" className="orange-text text-darken-2 "> Unfollow</span>
                <i className="material-icons  orange-text tiny right foo">person_add_disabled</i>
            </div>
            )
        } */}
        {
            !this.props.following
            ?
            (
            <div className="chip  grey lighten-2 hoverColor" onClick={this.followClick}>
                <span href="#" className="orange-text text-darken-2 "> Follow</span>
                <i className="material-icons  orange-text tiny right foo">person_add</i>
            </div>
            )
            :
            (
            <div className="chip  grey lighten-2 hoverColor" onClick={this.unfollowClick}>
                <span href="#" className="orange-text text-darken-2 "> Unfollow</span>
                <i className="material-icons  orange-text tiny right foo">person_add_disabled</i>
            </div>
            )
        }
        {/* <Link to={`/user/edit/${userId}`}> */}
        
        {/* </Link> */}
    </div>
  )
}
}



export default FollowButtonComponent