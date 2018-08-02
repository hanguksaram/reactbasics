import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './components/home/home'
import Layout from './hoc/layout'
import NewsArticle from './components/Articles/News/Post/index'
import SignIn from './components/signin/signin'
import Dashboard from './components/Dashboard/dashboard'

const Routes = (props) => {
   
        return (
            <Layout user={props.user}>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/articles/:id" exact component={NewsArticle}/>
                    <Route path="/sign-in" exact component={SignIn}/>
                    <Route path="/dashboard" exact component={Dashboard}/>
                </Switch>
            </Layout>
        );
    }

export default Routes
