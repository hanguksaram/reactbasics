import React from 'react'
import style from './navigationPanel.css'
import { Link, withRouter } from 'react-router-dom'
import FontAwesome from 'react-fontawesome'
import { firebase } from '../../firebase'


const NavigationPanel = (props) => {

    const items = [{
        type: style.option,
        icon: 'home',
        text: 'Home',
        link: '/',
        login: ''
    },
    {
        type: style.option,
        icon: 'file-text-o',
        text: 'News',
        link: '/news',
        login: ''
    },
    {
        type: style.option,
        icon: 'play',
        text: 'Videos',
        link: '/videos',
        login: ''

    },
    {
        type: style.option,
        icon: 'play',
        text: 'Dashboard',
        link: '/dashboard',
        login: true

    },
    {
        type: style.option,
        icon: 'sign-in',
        text: 'Sign in',
        link: '/sign-in',
        login: false
    },
    {
        type: style.option,
        icon: 'sign-out',
        text: 'Sign out',
        link: '/sign-out',
        login: true
    }
]
    const element = (elem, i) =>  (
        <div key={i} className = {elem.type}>
            <Link to={elem.link}>
                <FontAwesome name={elem.icon}/>
                {elem.text}
            </Link>
        </div>
    )

    const restricted = (elem, i) => {
        if (!elem.login && props.user === null)
            return element(elem, i)
        if (elem.login && props.user) {
            if(elem.link === '/sign-out'){
                return (<div key={i} className = {elem.type}
                        onClick={() => {firebase.auth().signOut()
                            .then(() => {
                              props.history.push("/")  
                            })}}>
                        
                        <FontAwesome name={elem.icon}/>
                        {elem.text}
                 
                </div>)
            }
            return element(elem,i)
        }
    }
    
    const showItems = () => {
        return items.map((elem, i) => {
            if (elem.login === '')
                return element(elem, i)
            else 
                return restricted(elem, i)
        
        })
    }




    
  
    return (
        <aside className={style.navPanel}>
            <nav>
                {showItems()}
            </nav>
        </aside>
    )
}

export default withRouter(NavigationPanel)