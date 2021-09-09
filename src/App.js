import React, { Component } from 'react';
import Header from "./Components/Header/Header.jsx";
import Movies from './Components/Movies/Movies.jsx';
import Pagination from './Components/Pagination/Pagination.jsx';
import axios from "axios";
import {API_KEY, API_URL, IMAGE_URL} from "./API/secrets.js";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Favourites from './Components/Favourites/Favourites.jsx';
import MoviePage from './Components/Moviepage/MoviePage.jsx';



class App extends Component {
  state = { 
    moviesData : [],
    currentMovie : "avengers",
    pages : [],
    fav : [],
    currPage : 1,
   }

  async componentDidMount(){
    
    let data = await axios.get(API_URL + "/search/movie",{
      params : {api_key : API_KEY, page : 1, query : this.state.currentMovie}
    } );
    let moviesData = data.data.results;
    let pagesCount = data.data.total_pages;
    let pages = [];
    for(let i = 0; i<=pagesCount; i++){
      pages.push(i);
    }
    this.setState({
      moviesData : moviesData,
      pages : pages
    })

  }

  setMovies = async (newMovieName) => {
    let data = await axios.get(API_URL + "/search/movie", {
      params: { api_key: API_KEY, page: 1, query: newMovieName },
    });
    let moviesData = data.data.results.slice(0, 10);
    let pagesCount = data.data.total_pages; //3
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }
    this.setState({
      moviesData: moviesData,
      currentMovie: newMovieName,
      pages: pages,
    });
  };

  nextPage = async () => {
    let data = await axios.get(API_URL + "/search/movie", {
      params: {
        api_key: API_KEY,
        page: this.state.currPage + 1,
        query: this.state.currentMovie,
      },
    });
    console.log(data);
    let moviesData = data.data.results.slice(0, 10);
    this.setState({
      moviesData: moviesData,
      currPage: this.state.currPage + 1,
    });
  };

  previousPage = async () => {
    let data = await axios.get(API_URL + "/search/movie", {
      params: {
        api_key: API_KEY,
        page: this.state.currPage - 1,
        query: this.state.currentMovie,
      },
    });
    console.log(data);
    let moviesData = data.data.results.slice(0, 10);
    this.setState({
      moviesData: moviesData,
      currPage: this.state.currPage - 1,
    });
  };

  setPage = async (pageCount) => {
    let data = await axios.get(API_URL + "/search/movie", {
      params: {
        api_key: API_KEY,
        page: pageCount,
        query: this.state.currentMovie,
      },
    });
    console.log(data);
    let moviesData = data.data.results.slice(0, 10);
    this.setState({
      moviesData: moviesData,
      currPage: pageCount,
    });
  };

  updateFav = async (favMovie) => {
    let fav = this.state.fav;
    let nArr = fav.filter((movieObj) => {
      return movieObj == favMovie;
    })
    if(nArr.length == 0){
      fav.push(favMovie);
      this.setState({
        fav : fav,
      })
    }
  }
  render() { 
    return (
    <Router>
    <div className = "App">
      <Header setMovies = {this.setMovies}></Header>
      <switch>
        <Route path = "/" exact>
          {this.state.moviesData.length ? (
                    <React.Fragment>
                      
                      <Movies movies={this.state.moviesData}></Movies>
                      <Pagination
                        pages={this.state.pages}
                        currPage={this.state.currPage}
                        nextPage={this.nextPage}
                        previousPage={this.previousPage}
                        setPage={this.setPage}
                      ></Pagination>
                    </React.Fragment>
                  ) : (
                    <h1>Oops No Movies Found !</h1>
                  )}
       </Route> 

       <Route path = "/fav" render = {(props) => <Favourites {...props} favMovie = {this.state.fav}></Favourites>}></Route>
       <Route path = "/moviepage" render = { (props) => <MoviePage {...props} updateFav={this.updateFav} favMovie={this.state.fav}></MoviePage>} exact>
         
       </Route>
    </switch>
    </div>
    </Router>
    );
               
  }

}
 
export default App;
  