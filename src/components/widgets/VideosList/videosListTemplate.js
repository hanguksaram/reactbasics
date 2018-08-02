import React from 'react';
import styles from './videosList.css'

import { Link } from 'react-router-dom'
import CardInfo from '../CardInfo/cardInfo'

const VideosListTemplate = ({data, teams}) => {
    return data.map((elem, index) => {
        return (<Link to={`/videos/${elem.id}`} key={index}>
            <div className={styles.videoListItem_wrapper}>
                <div className={styles.left}
                    style={{background: `url(/images/videos/${elem.image})`}}>
                    <div></div>
                </div>
                <div className={styles.right}>
                   <CardInfo date={elem.date}
                    {...teams.find((team) => {
                        return team.id === elem.team
                    })}/>
                    <h2>{elem.title}</h2>
                </div>

            </div>
        </Link>)
    })
};

export default VideosListTemplate;