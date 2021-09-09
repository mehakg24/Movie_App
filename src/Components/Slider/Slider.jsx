import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import ReactPlayer from 'react-player';

class Slider extends Component {
    state = {  }
    render() { 
        return (
            <Carousel renderItem={customRenderItem} renderThumbs={customRenderThumb}>
            <YoutubeSlide key="youtube-1" url="https://www.youtube.com/embed/AVn-Yjr7kDc" />
            <YoutubeSlide key="youtube-2" url="https://www.youtube.com/embed/mOdmi9SVeWY" />
            <YoutubeSlide key="youtube-3" url="https://www.youtube.com/embed/n0F6hSpxaFc" />
            <YoutubeSlide key="youtube-4" url="https://www.youtube.com/embed/0uGETVnkujA" />
            </Carousel>
            );
    }
}
 
export default Slider;