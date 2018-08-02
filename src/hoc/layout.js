import React, { Component } from 'react';
import styles from './layout.css'
import Footer from '../components/footer/footer'
import Header from '../components/header/header';
import NavigationPanel from '../components/navigationPanel/navigationPanel'

class Layout extends Component {

    state = {
      showNav:false  
    }

    toggleSidenav = (action) =>{
        this.setState({
            showNav:action
        })
    }
 
    render(){
        return(
            <div className={styles.layout}>
                <Header
                    
                    showNav={this.state.showNav}
                    onHideNav={() => this.toggleSidenav(false)}
                    onOpenNav={() => this.toggleSidenav(true)}
                />
                <div className={styles.layout_main}>
                    <NavigationPanel
                        user={this.props.user}/>
                    <main >
                        <section>
                            {this.props.children}
                        </section>
                    </main>
                    <aside style={{flex:"1.5 2 auto"}}>123</aside>
                </div>
               <Footer/>
            </div>
        )
    }

}

export default Layout;