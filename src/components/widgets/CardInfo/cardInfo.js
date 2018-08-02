import React from 'react';
import FontAwesome from 'react-fontawesome'
import styles from './cardInfo.css'
import moment from 'moment'

const CardInfo = ({name, date}) => {
    
    const formatDate = (date) => {
        return moment(date).format('MM-DD-YYYY')
    }

    return (
        <div className={styles.cardInfo}>
            <span className={styles.teamName}>{name}</span>
            <span className={styles.date}>
                <FontAwesome name="clock-o"/> {formatDate(date)}</span>
        </div>
    );
};

export default CardInfo;