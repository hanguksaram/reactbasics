import React from 'react';
import styles from '../articles.css'

const TeamInfo = ({logo, city, name, stats}) => {
    console.dir(stats)
    return (
        <div className={styles.articleTeamHeader}>
            <div className={styles.left}
                styles={{
                    background:`url('/images/teams/${logo}`
                }}></div>
            <div className={styles.right}>
                <div>
                    <span>{city} {name}</span>
                </div>
                <div>
                    {stats instanceof Array ?
                         <strong> W{stats[0].wins}-L{stats[0].defeats} 
                          </strong> : null}
                        
                   
                </div>
            </div>
            team info
        </div>
    );
};

export default TeamInfo;