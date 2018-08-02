import React, { Component } from 'react';
import axios from 'axios'
import { URL } from '../../../../config'
import Header from './header'
import Body from './body'
import styles from '../../articles.css'

class NewsArticles extends Component {

    state = {
        article:{},
        team:{}
    }
    componentWillMount() {
        axios.get(`${URL}/articles?id=${this.props.match.params.id}`)
            .then((response) => {
                const article = response.data;
                    return axios.get(`${URL}/teams?id=${article[0].team}`)
                        .then((response) => {
                            this.setState(() => (
                                {
                                    article: article[0],
                                    team: response.data[0]
                                }
                            ))
                           
                        })
            })
    }

    render() {
        const {article, team} = this.state

        return (
            <div className = {styles.articleWrapper}>
                <Header author={article.author} date={article.date} team = {team}/>
                <Body/>

            </div>
        );
    }
}

export default NewsArticles;