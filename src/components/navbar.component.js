import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
  // navbar from bootstrap documentation
  render() {
    return (
      <nav className="navbar navbar-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Home</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
            <Link to="/happy" className="nav-link">Happy Days</Link>
          </li>
          <li className="navbar-item">
            <Link to="/create" className="nav-link">New Entry</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}