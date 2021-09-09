import React, { Component } from 'react';
import Movies from '../Movies/Movies.jsx';
import "./Favourites.css";
class Favourites extends Component {
    state = {  }
    render() { 
        return (
            <Movies movies={this.props.favMovie}></Movies>
            );
    }
}
 
export default Favourites;