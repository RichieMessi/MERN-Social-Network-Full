import React, { Component } from "react";
import { Redirect } from "react-router-dom"
import { isAuthenticated, signOut } from "../../auth"
import { remove } from "./apiPost"
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

class DeletePostComponent extends Component {

  state = {
    redirect: false
  }

  componentDidMount() {
    const options = {
      // onOpenStart: () => {
      //   console.log("Open Start");
      // },
      // onOpenEnd: () => {
      //   console.log("Open End");
      // },
      // onCloseStart: () => {
      //   console.log("Close Start");
      // },
      // onCloseEnd: () => {
      //   console.log("Close End");
      // },
      inDuration: 250,
      outDuration: 250,
      opacity: 0.5,
      dismissible: true,
      startingTop: "4%",
      endingTop: "10%"
    };
    M.Modal.init(this.Modal, options);

    // let instance = M.Modal.getInstance(this.Modal);
    // instance.open();
    // instance.close();
    // instance.destroy();
  }



  handleDelete = () => {
    // alert('done')
    const token = isAuthenticated().token
    const postId = this.props.postId
    remove(postId, token) 
    .then(data => {
      if(data.error) {
        console.warn(data.error)
      } else {
        // signout user
        // redirect
        this.setState({
          redirect: true
        })
      }
    })
  }

  render() {
    if(this.state.redirect) {
      return <Redirect to="/"></Redirect>
    }
    return (
      <div>
        {/* <a
          className="waves-effect waves-light btn modal-trigger"
          data-target="modal1"
        >
          Modal
        </a> */}
        <div className="chip hoverColor modal-trigger right" data-target="modal1">
          <span href="#" className="amber-text text-darken-2 "> Delete</span>
          <i className="material-icons  amber-text tiny right foo">close</i>
        </div>

        <div
          ref={Modal => {
            this.Modal = Modal;
          }}
          id="modal1"
          className="modal  background-modal-light-karo"
        >
          <div className="modal-content  background-light-karo">
            <h4 className="white-text">Deleting Post</h4>
            <p className="white-text">Are you sure?</p>
          </div>
          <div className="modal-footer  background-light-karo">
            <span className="modal-close btn-floating grey ">
              <i className="material-icons">close</i>
            </span>
            <span className="modal-close btn-floating amber" onClick={this.handleDelete}>
             <i className="material-icons">done</i>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default DeletePostComponent;
