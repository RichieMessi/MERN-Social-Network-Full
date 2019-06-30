import React from 'react'
import { Link } from 'react-router-dom'
import pen from '../../images/pen.jpg';
import umbrella from '../../images/umbrella.jpg';
import noImage from '../../images/noImage.jpg'


const HomePostComponent = (props) => {

    const { posts } = props
    const renderPosts = (posts) => {
        return (
            posts.map(post => {
                var photoUrl = post._id ? `${process.env.REACT_APP_API_URL}/post/photo/${post._id}?${new Date().getTime()}` : pen
                  return (
                    <div className=""  key={post._id}>
                    <div className="card horizontal">
                        <div className="card-image">
                            <img  src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`} onError={i => i.target.src = `${noImage}`}  />
                        </div>
                        <div className="card-stacked">
                            <div className="card-content">
                                {
                                    post.postedBy
                                    ?
                                    (
                                    <Link to={`/user/${post.postedBy._id}`}>
                                        <img className="responsive-img right circle left userListPhoto" width="35" src={`${process.env.REACT_APP_API_URL}/user/photo/${post.postedBy._id}`} alt=""/>
                                    </Link>
                                    )
                                    :
                                    ('USER DELETED')
                                }
                            <h6 className="amber-text lead">{post.title}</h6>
                            {/* <br/> */}
                            {
                                    post.postedBy
                                    ?
                                    (
                                    <Link to={`/user/${post.postedBy._id}`}>
                                        <span style={{"fontSize": "0.7rem"}} className="left grey-text chip ">{`Posted By ${post.postedBy.name}`}</span><br/>
                                    </Link>
                                    )
                                    :
                                    ('USER DELETED')
                                }
                            
                                <span style={{"fontSize": "0.7rem"}}  className="right  grey-text">{`${new Date(post.created).toDateString()}`}</span>
                            </div>
                            <div className="card-action">
                                <Link to={`/post/${post._id}`}>
                                    <div className="chip boo amber-text text-darken-2 left">
                                        <i className="material-icons  amber-text tiny right foo">arrow_upward</i>
                                        <span href="#" className=" ">Read More</span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        </div> 
                    </div>
                  )
              })
        )
    }

    console.warn(props)
        return (
            <div className="col s12 m7">
                            {
                                renderPosts(posts)
                            }
                    </div>
        )
}

export default HomePostComponent

