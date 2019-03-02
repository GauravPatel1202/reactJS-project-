import React, { Component } from 'react';
import './App.css';
import Header from './components/ShareComp/header'
import Search from './components/SearchComp/search' 
import Results from './components/Searchresult/result' 
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
const routes = [
  {
    path: '/',
    component: Search
  },
  { path: '/Searchresult/:topic',
    component: Results,
  },
  
]
class App extends Component {
  render() {
    return (
      <div >
    <Header/>
      <Router>
      <div className="container ">
         {routes.map((route) => (
          <Route exact key={route.path}  path={route.path} component={route.component}
          />
        ))}
      </div>
    </Router>
    </div>
    );
  }
}

export default App;


