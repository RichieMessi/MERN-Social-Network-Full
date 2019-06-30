import React from 'react'
import { Route, Switch } from 'react-router-dom'

import HomeComponent from '../components/Home'
import SignupComponent from '../components/user/Signup'
import SigninComponent from '../components/user/Signin'
import ProfileComponent from '../components/user/Profile'
import UsersComponent from '../components/user/Users'
import EditProfileFormComponent from '../components/user/EditProfileForm'
import NewPostFormComponent from '../components/post/NewPostForm';
import PostDetailsComponent from '../components/post/PostDetails'
import EditPostFormComponent from '../components/post/EditPostForm'

import PrivateRouteComponent from '../auth/PrivateRoute';

const MainRouterComponent = () => {
    return (
        <div>
        <Switch>
            <Route exact path="/" component={HomeComponent} />
            <Route path="/signup" component={SignupComponent} />
            <Route path="/signin" component={SigninComponent} />
            <PrivateRouteComponent exact path="/user/edit/:userId" component={EditProfileFormComponent} />
            <PrivateRouteComponent exact path="/user/:userId" component={ProfileComponent} />
            <PrivateRouteComponent exact path="/post/create" component={NewPostFormComponent} />
            <Route path="/users" component={UsersComponent} />
            <Route exact path="/post/:postId" component={PostDetailsComponent} />
            <PrivateRouteComponent exact path="/post/edit/:postId" component={EditPostFormComponent} />
        </Switch>
    </div>
    )
}

export default MainRouterComponent