import React, { Component} from 'react'
import axios from 'axios'
import SliderTemplates from './slider_templates'
import { firebaseArticles, firebaseLooper } from '../../../firebase'

class NewsSlider extends Component {
    
    state = {
        news: []
    }
   
    componentWillMount() {
        const {start, amount} = this.props

        firebaseArticles.limitToFirst(3).once('value')
            .then((snapshot) => {
                const news = firebaseLooper(snapshot)
                 this.setState(() => ({news}))
            })

        // axios.get(`${URL}/articles?_start=${start}&_end=${amount}`)
        //     .then((response) => {
        //         this.setState(() => ({
        //             news:response.data
        //         }))
        //     })
    }

    render() {
        
        const {type} = this.props
    
        return (
            <SliderTemplates settings={this.props.settings} data={this.state.news} type={type}/>
        )
    }
}
export default NewsSlider