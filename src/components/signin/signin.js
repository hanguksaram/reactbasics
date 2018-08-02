import React, { Component } from 'react';
import styles from './signin.css'
import FormField from '../widgets/FormFields/formFields'
import { firebase } from '../../firebase'

class Signin extends Component {
    
    state = {

        registerError: undefined,
        loading:false,
        formdata: {
            email:{
                element: 'input',
                value: '',
                config: {
                    name:'email_input',
                    type: 'email',
                    placeholder: 'Enter youor email'
                },
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                touched: false,
                validationMessage: ''

                
            },
            password:{
                element: 'input',
                value: '',
                config: {
                    name:'password_input',
                    type: 'password',
                    placeholder: 'Enter youor password'
                },
                validation: {
                    required: true,
                    password: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            }
        }
    }

    renderFields = () => {
        
        const fields = []
        for (let key in this.state.formdata) {
            fields.push(
                {
                    key,
                    ...this.state.formdata[key]
                })
        }
    }

    submitForm = (event, type) => {
        
        event.preventDefault()
        if(type !== null) {
            
            let dataToSubmit = {}
            let formIsValid = true

            for (let key in this.state.formdata){
                dataToSubmit[key] = this.state.formdata[key].value
            }
            for (let key in this.state.formdata) {
                if (!this.state.formdata[key].valid) {
                    formIsValid = false
                    break
            }
            }
            if (formIsValid) {
                this.setState(() => ({
                    loading:true,
                    registerError:undefined
                }))
                switch(type){
                    case 'register' :
                        firebase.auth()
                            .createUserWithEmailAndPassword(
                                dataToSubmit.email,
                                dataToSubmit.password
                            ).then(() => {
                               this.setState(() => ({
                                    loading: false,
                                    registerError: undefined
                                    
                                }))
                            }, (e) => {
                                this.setState(() => ({
                                    loading: false,
                                    registerError: e.message
                                }))
                            })
                                
                        break
                    case 'login' :
                        firebase.auth()
                            .signInWithEmailAndPassword(
                                dataToSubmit.email,
                                dataToSubmit.password
                            ).then(() => {
                                this.setState(() => ({
                                     loading: false,
                                     registerError: undefined
                                     
                                 }))
                             }, (e) => {
                                 this.setState(() => ({
                                     loading: false,
                                     registerError: e.message
                                 }))
                             })
                        console.log('login')
                    default:
                        break
                }

                
            }


        }
    }

    submitButton = () => {
        
        return this.state.loading ? 
            'loading...' 
        :
        <div>
            <button onClick={(event) => this.submitForm(event, 'register')}>Register Now</button>
            <button onClick={(event) => {this.submitForm(event, 'login')}}>Log in</button>
        </div>

    }

    updateForm = ({id, event, blur}) => {
        
        const newFormData = {
            ...this.state.formdata
        }
        const newElement = {
            ...newFormData[id]
        }
        newElement.value = event.target.value
        if(blur) {
            let validData = this.validate(newElement)
            newElement.valid = validData[0]
            newElement.validationMessage = validData[1]
        }
        newElement.touched = blur
        newFormData[id] = newElement
        this.setState(() => ({
           formdata: newFormData
        }))
    
        
    }
    validate = (element) => {
        let error = [true, '']
        
        if(element.validation.email){
            const valid = /\S+@\S+\.\S+/.test(element.value)
            const message = `${!valid ? 'Must be valid email adress': ''}`
            error = !valid ? [valid, message] : error
        }


        if(element.validation.password){
            const valid = element.value.length >= 5
            const message = `${!valid ? 'Must be greater then 5': ''}`
            error = !valid ? [valid, message] : error
        }

        if(element.validation.required) {
            
            const valid = element.value.trim() !==''
            const message = `${!valid ? 'This field is required': ''}`
            error = !valid ? [valid, message] : error
        }

        return error
    }

    render() {
        return (
            <div className={styles.logContainer}>
                {!!this.state.registerError && <div>{this.state.registerError}</div> }
                <form onSubmit={(event) => {this.submitForm(event,null)}}>
                    <FormField
                        id={'email'}
                        formdata={this.state.formdata.email}
                        change={this.updateForm}/>
                        <FormField
                        id={'password'}
                        formdata={this.state.formdata.password}
                        change={this.updateForm}/>
                        {this.submitButton()}
                </form>
           </div>
        );
    }
}

export default Signin;