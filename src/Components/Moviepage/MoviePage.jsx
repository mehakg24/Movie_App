import React, { Component } from 'react';
import "./MoviePage.css"
import YouTube from 'react-youtube';
import axios from 'axios';
import {API_KEY, API_URL} from "../../API/secrets.js"

class MoviePage extends Component {
    state = {
        videoObj : {}
      }

    async componentDidMount(){
        //https://api.themoviedb.org/3/movie/299534/videos?api_key=8ed127c2c49019165f16ef18b5bb5d86&language=en-US
        let response = await axios(`${API_URL}/movie/${this.props.location.state.id}/videos?api_key=${API_KEY}&language=en-US`);
        let videoObj = response.data.results.filter((videoObj) => {
            if (videoObj.type == "Trailer" && videoObj.site == "YouTube") {
                return true;
              }
              return false;
            
        })
        this.setState({
            videoObj : videoObj[0]
        })
    }
    render() { 

        let {title,tagline,vote_average,poster_path,overview} = this.props.location.state;
        const opts = {
            height: '390',
            width: '100%',
            playerVars: {
              // https://developers.google.com/youtube/player_parameters
              autoplay: 1,
            },
          };
        return(
        
        <div className="movie-page">
            <div className="movie-page-poster">
                <img src={poster_path} alt=""/>
            </div>
            <div className="movie-page-details">
                <div className="movie-title-info">
                    <h1>
                        {title} <br></br> IMDB : {vote_average}
                    </h1>
                    <button type="button" class="btn btn-warning" onClick = {() => {this.props.updateFav(this.props.location.state)}}>Add To Fav</button>
                    <span>  {tagline}</span>
                    <br></br>
                    <p>{overview}</p>
                </div>
                <div className="movie-trailer">
                    {(this.state.videoObj) ? ( <YouTube videoId ={this.state.videoObj.key} opts = {opts}></YouTube>) : (<YouTube></YouTube>)}
                </div>
            </div> 
        </div>

        );
    }
}
 
export default MoviePage;