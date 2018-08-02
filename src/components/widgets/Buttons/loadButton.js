import React from 'react';
import { Link } from 'react-router-dom'
import styles from './buttons.css'

// type="loadmore"
// loadmore={this.loadmore}
// cta="Load More News"/>        

const LoadButton = ({type, loadmore, cta, linkTo = "/home"}) => {

    let template = null
    console.log(loadmore)
    switch(type) {
        case 'loadmore':
            template = (
                <div>
            <button className={styles.blue_btn} onClick={loadmore}>{cta}</button>
        </div>
            )
            break
        case 'linkTo':
            template = (
                <Link to={linkTo}
                    className={styles.blue_btn}>
                    {cta}</Link>
            )
            break
        default:
            template = null
    }
    return template

   
};

export default LoadButton;