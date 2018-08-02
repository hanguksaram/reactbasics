import React, { Component } from 'react';
import styles from './videosList.css'
import axios from 'axios'
import VideosTemplate from '../VideosList/videosListTemplate'
import { URL } from '../../../config'
import Button from '../Buttons/loadButton'

class VideosList extends Component {
    
    state = {
        teams:[],
        videos:[],
        start: this.props.start,
        end: this.props.start + this.props.amount,
        amount: this.props.amount
    }
    
    componentWillMount(){
        this.request(this.state.start, this.state.end)
    }

    renderTitle = () => {
        return this.props.title ? (
            <h3><strong>NBA</strong> Videos</h3>
        ) : null
    }
    request = (start, end) => {
        if (this.state.teams.length < 1) {
            axios.get(`${URL}/teams`)
                .then((response) => {
                    this.setState(() => ({
                        teams: response.data
                    }))
                })
        }
        axios.get(`${URL}/videos?_start=${start}&_end=${end}`)
            .then((response) => {
                this.setState((prevState) => ({
                    videos: [...prevState.videos, ...response.data],
                    end
                }))
            })
    }
    renderVideos = () => {

        let template = null;
        switch(this.props.type){
            case 'card' :
                template = <VideosTemplate data={this.state.videos} teams = {this.state.teams}/>
                break;
            default:
                template = null
        }
        return template;
    }
    loadMore = () => {
        console.log('button pressed')
        this.request(this.state.end, this.state.end + this.state.amount)
    }
    renderButton = () => {
        return this.props.loadmore ? 
            <Button
                type="loadmore"
                loadmore={this.loadMore}
                cta="Load More Videos"/>
            :
             <Button type="linkTo" cta="More videos" linkTo="/videos"/>
            
    }
    
    render() {
        
        return (
            <div className={styles.videoList_wrapper}>
                {this.renderTitle()}
                {this.renderVideos()}
                {this.renderButton()}
            </div>
        );
    }
}

export default VideosList;