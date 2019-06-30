import React, { Component } from 'react';
import NavbarComponent from './components/Navbar' 

// import main from './main.css'
import { BrowserRouter as Router } from 'react-router-dom'

import MainRouterComponent from './routes/MainRouter'


class App extends Component {
  render() {
    return (
      <div className="">
        <Router>
        <NavbarComponent />
          <MainRouterComponent />
        </Router>
      </div>
    );
  }
}

export default App;
