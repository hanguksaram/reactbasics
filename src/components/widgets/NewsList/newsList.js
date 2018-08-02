import React, { Component } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { Link } from 'react-router-dom'
import { firebaseTeams, firebaseArticles, firebaseLooper} from '../../../firebase'
import LoadButton from '../Buttons/loadButton'
import CardInfo from '../CardInfo/cardInfo'

import styles from './newsList.css'


class NewsList extends Component {

    state = {
        teams:[],
        items:[],
        start:this.props.start,
        end:this.props.start + this.props.amount,
        amount:this.props.amount
    }
    renderNews = (type) => {
        let template = null
        
        switch(type){
            case 'card': 
            
                template = this.state.items.map((elem, index) => {
                    return (
                     <CSSTransition
                        classNames={{
                            enter: styles.newsList_wrapper,
                            enterActive:styles.newsList_wrapper_enter
                        }}
                        timeout={500}
                        key={index}>
                        <div>
                            <div className = {styles.newslist_item}>
                                <Link to={`/articles/${elem.id}`}>
                                    <CardInfo date={elem.date} {...this.state.teams.find((element) => {
                                        return elem.team === element.teamId
                                    })}/>
                                    <h2>{elem.title}</h2>
                                </Link>
                            </div>
                        </div>
                     </CSSTransition>
                    )
                })
                break;
            default:
                template = null
        }
        return template
    }
    componentWillMount(){
        const {start, end} = this.state
        this.request(start, end) 
    }
    request = (start, end) => {
        if(this.state.teams < 1){

            firebaseTeams.once('value')
                .then((snapshot) => {
                    const teams = firebaseLooper(snapshot)
                    this.setState(() => ({teams}))
                })

            // axios.get(`${URL}/teams`)
            //     .then((response) => {
            //         this.setState(() => ({
            //             teams: response.data
            //         }))
            //     })
               
        }

            firebaseArticles.orderByChild('id').startAt(start).endAt(end).once('value')
                .then((snapshot) => {
                    const articles = firebaseLooper(snapshot)
                    this.setState((prevState) => ({
                        items: [...prevState.items, ...articles],
                        end: prevState.end + prevState.amount + 1

                    }))
                }, (e) => {
                    console.log(e)
                })
        // axios.get(`${URL}/articles?_start=${start}&_end=${end}`)
        //     .then((response) => {
        //         this.setState((prevState) => ({
        //             items: [...prevState.items, ...response.data],
        //             end: prevState.end + prevState.amount
        //         }))

        // })
    }

    loadMore = () => {
        const{end, amount} = this.state
        this.request(end, end + amount)

    }
    render(){
        
        console.log(this.state.items)
        return(<div>
            <TransitionGroup
                component="div"
                className="list"
                >
                {this.renderNews(this.props.type)}
            </TransitionGroup>
            <LoadButton
                type="loadmore"
                loadmore={this.loadMore}
                cta="Load More News"/>        
                    
                    
                </div>)
    }

}

export default NewsList