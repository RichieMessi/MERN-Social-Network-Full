import React, { Component } from 'react'
import { comment, uncomment } from './apiPost'
import { isAuthenticated } from '../../auth'
import { Link, Redirect } from 'react-router-dom'

import defaultProfile from '../../images/defaultProfile.png'


class CommentComponent extends Component {


    state = {
        text: "",
        error: "",
        errorState: false,
        redirect: false
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
            errorState: false
        })
    }

    isValid = () => {
        const { text } = this.state;
        if(!text.length > 0 || text.length > 150 ) {
            this.setState({error: "Comment must not be empty or less thatn 150 characters long...", errorState: true})
            return false
        } 
        return true
    }

    // isUserAuth = () => { return <Redirect to={`/signin`} /> }
    // isUserAuth = () => alert('ran')
    
    renderError = () => <div style={{padding: "3rem"}} className="grey-text amber lighten-5">{this.state.error}</div>

    addComment = e => {
        e.preventDefault()
        if(isAuthenticated() && isAuthenticated().user) {

            const userId = isAuthenticated().user._id
            const token = isAuthenticated().token
            const postId = this.props.postId

            if(this.isValid()) {

                const commentBody = {text: this.state.text}
                comment(userId, token, postId, {text: this.state.text})
                .then(data => {
                    if(data.error) {
                        console.warn(data.error)
                    } else {
                        this.setState({
                            text: ""
                        })
                        console.warn(this.state)
                        this.props.updateComments(data.comments)
                    }
                })
            }
        } else {
            this.setState({ redirect: true})
        }
    }

    handleUncomment = comment => {
        const userId = isAuthenticated().user._id
        const token = isAuthenticated().token
        const postId = this.props.postId

        uncomment(userId, token, postId, comment)
            .then(data => {
                if(data.error) {
                    console.warn(data.error)
                } 
                this.props.updateComments(data.comments)
            })
            .catch(err => console.warn(err))
    }
        
        render() {
        console.warn(this.props)
        // alert(this.props.comments)
        if(this.state.redirect) {
            return <Redirect to="/" />
        }


        // this.state.error ? (`<div className="amber-text">${this.state.error}</div>`)  : null
        
        return (
            <>
            <div className="row">
                    {/* this.isUserAuth() */}
            <div className="col s12">
            <div className="card white">
                <div className="card-content white-text">
                    {this.props.comments ? (<span className="grey-text right">{this.props.comments.length} Comments</span>) : <span>0 Comments</span>} 
                
                    <span className="card-title amber-text">Comments Section</span>
                    { this.state.errorState ? this.renderError()  : null }
                    <form onSubmit={this.addComment} >
                        <input placeholder="Add Comment" type="text" name="text" onChange={this.handleChange} value={this.state.text}/>
                        <input type="submit" className="btn amber z-depth-0"  value="post comment" />
                    </form>
                </div>
                    {
              this.props.comments 
              ?
              (
                this.props.comments.map((comment, key) => {
                  return (
                      <div className="card background-light-karo-comment  z-depth-0 grey lighten-5" key={key} style={{marginBottom: "1rem", padding: "1rem"}}>
                        <div className="" style={{"paddingLeft": "1.5rem"}}>
                            {
                                comment.postedBy 
                                ?
                                (
                                    <>
                                    <Link to={`/user/${comment.postedBy._id}`}>
                                        <img style={{ borderRadius: "50%"}} className="responsive-img " width="40"  onError={i => i.target.src = `${defaultProfile}`}  src={`${process.env.REACT_APP_API_URL}/user/photo/${comment.postedBy._id}`} alt="" />
                                    </Link>
                                    {/* <span style={{"paddingLeft": "1rem"}} className="title amber-text right z-depth-0  btn grey lighten-4">{comment.postedBy.name}</span> */}

                                    </>
                                )
                                :
                                null
                            }
                            
                            {/* <span href="" className="secondary-content  btn-floating  z-depth-0" > */}
                            {/* <i className="material-icons grey lighten-3 amber-text text-darken-2  ">visibility</i> */}
                            <div style={{cursor: "default"}} className="chip upar-karo">
                                <span className="">{comment.text}</span>
                            </div><br/>

                            {
                                isAuthenticated().user && isAuthenticated().user._id === comment.postedBy._id ?
                                    <div style={{marginBottom: "1rem"}}>
                                    <button className="btn btn-floating amber lighten-3 right z-depth-0" onClick={() => this.handleUncomment(comment)}><span><i className="material-icons">close</i></span></button>

                                    </div>
                                    :
                                    null
                            }
                            <span style={{"fontSize": "0.7rem"}}  className="  grey-text">{`${new Date(comment.created).toDateString()}`}</span>
                            {/* <span style={{"fontSize": "0.7rem"}}  className="  grey-text"><DeleteComment /></span> */}
                            {/* </span> */}
                        </div> 
                        </div>
                  )
                })
              )
              :
              (
                <>
                <div className="red-text">Loading............</div>
                </>
              )
            }
            </div>
                </div>
            </div>
            </>
        )
    }
}


export default CommentComponent