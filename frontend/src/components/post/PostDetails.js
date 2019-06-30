import React, {Component} from 'react'
import { readSinglePost, like, unlike } from './apiPost'
import umbrella from '../../images/umbrella.jpg';
import noImage from '../../images/noImage.jpg'
import DeletePostComponent from './DeletePost'
import { isAuthenticated }  from '../../auth'

import CommentComponent from './Comment'
import { Link, Redirect } from 'react-router-dom'
import defaultProfile from '../../images/defaultProfile.png';



class PostDetailsComponent extends Component {

    // constructor() {
        // super()
        state = {
            post: "",
            error: "",
            like: false,
            likes: 0,
            redirect: false,
            toast: false,
            comments: []
        }
    // }

    checkLike = (likesArray) => {
        const userId = isAuthenticated() && isAuthenticated().user._id
        let match = likesArray.indexOf(userId) !== -1 
        return match
    }

    // init = (postId) => {
    //     readSinglePost(postId)
    //     .then(data => {
    //       if(data.error) {
    //         this.setState({
    //             redirect: true,
    //             error: data.error
    //         })
    //       } else {
    //         this.setState({
    //             post: data,
    //             likes: data.likes.length,
    //             like: this.checkLike(data.likes),
    //             comments: data.comments
    //         })
    //       }
    //     })
    //   }

      componentDidMount() {
        const postId = this.props.match.params.postId
        // this.init(postId)
        readSinglePost(postId)
        .then(data => {
          if(data.error) {
            this.setState({
                redirect: true,
                error: data.error
            })
          } else {
            this.setState({
                post: data,
                likes: data.likes.length,
                like: this.checkLike(data.likes),
                comments: data.comments
            })
          }
        })
      }

      updateComments = comments => {
          console.log(comments)
          console.log(this)
           this.setState({ comments })
      }

      componentWillReceiveProps(nextProps) {
        // const newComments = nextProps.match.params.userId
        console.warn(nextProps)
        
      }

      likeToggle = () => {

        if(!isAuthenticated()) {
            this.setState({
                redirect: true
            })
            // window.M.toast({html: 'Please Sign In', displayLength: 4000})
            
            return false
        }
          let apiCall = this.state.like ? unlike: like
          const userId = isAuthenticated().user._id
          const postId = this.state.post._id
          const token = isAuthenticated().token

          apiCall(userId, token, postId)
            .then(data => {
                if(data.error) {
                    console.warn(data.error)
                } else {
                    this.setState({
                        like: !this.state.like,
                        likes: data.likes.length
                    })
                    this.state.like ? window.M.toast({html: 'Post Liked', displayLength: 4000}) : window.M.toast({html: `Post Disliked`, displayLength: 4000})
                }
            })
      }
    

    render(){

        if(this.state.redirect) {
            return <Redirect to={`/signin`}></Redirect>
        }
        const {post} = this.state
        let photoUrl 
        let userId
        let userName
        let likes
        let comments
        if(this.state.post) {
            if(this.state.post.postedBy) {
                // photoUrl = this.state.post.postedBy  ? `${process.env.REACT_APP_API_URL}/user/photo/${post.postedBy._id}}?${new Date().getTime()}` : defaultProfile
                photoUrl = `${process.env.REACT_APP_API_URL}/user/photo/${post.postedBy._id}?${new Date().getTime()}`
                userId = this.state.post.postedBy._id
                userName = this.state.post.postedBy.name
                likes = this.state.post.likes
                comments = this.state.comments

            } else {
                photoUrl = defaultProfile
            }
        }
        console.warn(this.state)
        return (
            <div className="container">
            <br/><br/>
            <div className=""  key={post._id}>
                    <div className="card horizontal">
                        <div className="card-image">
                            <img  src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`} onError={i => i.target.src = `${noImage}`}  />
                        </div>
                        <div className="card-stacked">
                            <div className="card-content">
                                <Link to={`/user/${userId}`}>
                                    <img className="responsive-img right circle left userListPhoto" onError={i => i.target.src = `${noImage}`} width="35" src={photoUrl} alt=""/>
                        <span className="grey-text left">Posted By: <span className="amber-text">{userName}</span></span><br/>
                        <span className="grey-text left">{`Created on`} <span className="amber-text">{new Date(post.created).toDateString()}</span></span>
                                </Link>
                            <h3 className="amber-text">{post.title}</h3>
                                <p className="grey-text ">{post.body}</p>
                                <br/><br/>
                                <div className="divider"></div>
                                <br/><br/>
                                <div className="chip left" onClick={this.likeToggle}>
                                    {
                                        !this.state.like
                                        ?
                                        (<i className="amber-text " style={{paddingTop: "0.3rem"}} className="material-icons">thumb_up</i>)
                                        :
                                        (<i className="" style={{paddingTop: "0.3rem"}} className="material-icons amber-text ">thumb_up</i>)
                                    }
                                
                                {likes ?  <span style={{paddingLeft: "1rem"}} className="right">{this.state.likes}</span>: null}
                                </div> 
                                {
                                    isAuthenticated().user && isAuthenticated().user._id === userId
                                    ?
                                    (
                                        <div>
                                            <DeletePostComponent postId={post._id} />
                                            <Link to={`/post/edit/${post._id}`}>
                                                <div className="chip hoverColor right">
                                                    <span href="#" className="amber-text text-darken-2 "> Edit</span>
                                                    <i className="material-icons  amber-text tiny right foo">edit</i>
                                                </div>
                                            </Link>
                                        </div>
                                    )
                                    :
                                    (
                                        null
                                    )
                                }
                            </div>
                        </div>
                        </div> 
                        <CommentComponent 
                            postId={post._id} 
                            comments={comments && comments.reverse()} 
                            updateComments={this.updateComments} 
                        />
                    </div>
            </div>
        )
    }
}


export default PostDetailsComponent