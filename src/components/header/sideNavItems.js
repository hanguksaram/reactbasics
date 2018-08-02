import React from 'react'
import style from './sideNav.css'
import { Link } from 'react-router-dom'
import FontAwesome from 'react-fontawesome'

const SideNavItems = () => {

    const items = [{
        type: style.option,
        icon: 'home',
        text: 'Home',
        link: '/'
    },
    {
        type: style.option,
        icon: 'file-text-o',
        text: 'News',
        link: '/news'
    },
    {
        type: style.option,
        icon: 'play',
        text: 'Videos',
        link: '/videos'

    },
    {
        type: style.option,
        icon: 'sign-in',
        text: 'Sign in',
        link: '/sign-in'
    },
    {
        type: style.option,
        icon: 'sign-out',
        text: 'Sign out',
        link: '/sign-out'
    }
]
    const showItems = () => {
        return items.map((elem, i) => {
            return (
                <div key={i} className = {elem.type}>
                    <Link to={elem.link}>
                        <FontAwesome name={elem.icon}/>
                        {elem.text}
                    </Link>
                </div>
            )
        })
    }




    
  
    return (
        <div>
            {showItems()}
        </div>
    )
}

export default SideNavItems