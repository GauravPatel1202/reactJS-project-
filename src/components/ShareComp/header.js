import React, { Component } from 'react';

class Header extends Component {
  render() {
    console.log(this.props)
    return (
       <div className="headreBg">
       <ul>
           <li><a className="active" href="/">Home</a></li>
      </ul>
      </div>
    );
  }
}
export default Header;