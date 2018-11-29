import React, { Component } from "react";
import "./Home.scss";

import { Link } from 'react-router-dom';

export default class Home extends Component {
  render() {
    return (
      <div className="selection">
        <Link to={'/mens'} className="dude" />
        
        <Link to={'/womens'} className="girl">
        </Link>
      </div>
    );
  }
}
