import React from 'react'
import styles from './footer.css'
import { Link } from 'react-router-dom'
import { CURRENT_YEAR } from '../../config'
const footer = () => {
    
    
    return (
        <footer className={styles.footer}>
            <Link to="/" className={styles.logo}>
                Home
            </Link>
            <div className={styles.right}>
                @javaboy {CURRENT_YEAR} all rights reserved.
            </div>
        </footer>
    )
}
export default footer