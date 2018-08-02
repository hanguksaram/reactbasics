import React from 'react';
import TeamInfo from '../../Elements/teamInfo'

const Header = ({author, date, team}) => {
    
    const teamInfo = () => {
        return team ? (
            <TeamInfo {...team}/>
        ) : null
    }
    
    return (
        <div>
            {teamInfo()}
        </div>
    );
};

export default Header;