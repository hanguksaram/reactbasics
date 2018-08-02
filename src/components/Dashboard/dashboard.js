import React, { Component } from 'react';
import styles from './dashboard.css'
import FormField from '../widgets/FormFields/formFields'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js'
import { stateToHTML }  from 'draft-js-export-html'
import { firebase, firebaseTeams, firebaseArticles } from '../../firebase'
import Uploader from '../widgets/FileUploader/fileUploader'

class Dashboard extends Component {
    
    
    state = {
        
        editorState: EditorState.createEmpty(),
        postError: undefined,
        loading:false,
        formdata: {
            
            author:{
                element: 'input',
                value: '',
                config: {
                    name:'author_input',
                    type: 'text',
                    placeholder: 'Enter youor name'
                },
                validation: {
                    required: true,
                    
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            
            title:{
                element: 'input',
                value: '',
                config: {
                    name:'author_input',
                    type: 'text',
                    placeholder: 'Enter youor name'
                },
                validation: {
                    required: true,
                    
                },
                valid: false,
                touched: false,
                validationMessage: ''

                
            },
            // body: {
            //     element: 'texteditor',
            //     value: '',
            //     vaild: true
            // },
             image: {
                 element: 'image',
                 value: '',
                 vaild: true
             },
             team: {
                 element: 'select',
                 value: '',
                 config: {
                     name:'teams_input',
                     options: []
                 },
                 validation: {
                     required: true,
                    
                 },
                 valid: true,
                touched: false,
                 validationMessage: ''
             }
        }
    }
    

    componentDidMount() {
        this.loadTeams()
    }
    loadTeams = () => {
        firebaseTeams.once('value')
            .then((snapshot) => {
                
                const teams = []

                snapshot.forEach((childSnapshot) => {
                    teams.push({
                        id: childSnapshot.val().teamId,
                        name: childSnapshot.val().city
                        
                    })
                })
                const newFormdata = {...this.state.formdata}
                const newElement = {...newFormdata['team']}

                newElement.config.options = teams
                newFormdata['team'] = newElement

                this.setState(() => ({
                    formdata: newFormdata
                }))

            })
    }


    onEditorStateChange = (editorState) => {
        
        let contentState = editorState.getCurrentContent()
        let rawState = convertToRaw(contentState)   

        let html = stateToHTML(contentState)
       
        // this.updateForm({id: 'body'}, html)

        this.setState(() => ({
            editorState
        }))
    }

    submitForm = (event) => {
       
       event.preventDefault()
       const dataToSubmit = {}
            let formIsValid = true
            
            for (let key in this.state.formdata){
                dataToSubmit[key] = this.state.formdata[key].value
            }
            console.log(this.state.formdata)
            for (let key in this.state.formdata) {
                if (!this.state.formdata[key].valid) {
                    formIsValid = false
                    break
            }
            }
            console.log(formIsValid)
            console.log(this.state.formdata)

            if (formIsValid) {
                
                this.setState(() => ({
                    loading: true,
                    postError: null
                }))

                firebaseArticles.orderByChild('id')
                    .limitToLast(1).once('value')
                        .then((snapshot) => {
                            
                            let articleId = null;
                            snapshot.forEach(childSnapshot => {
                                articleId = childSnapshot.val().id
                            })

                        })
                
                dataToSubmit['date'] = firebase.database.ServerValue.TIMESTAMP
                dataToSubmit['id'] = 0
                dataToSubmit['team'] = parseInt(dataToSubmit['team'])


            } else {
                this.setState(() => ({
                    postError: 'Something went wrong'
                }))
            }
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


    updateForm = ({id, event, blur}, content = '') => {
        
        const newFormData = {
            ...this.state.formdata
        }
        const newElement = {
            ...newFormData[id]
        }

        if (content === '' ){
            newElement.value = event.target.value
        } else {
            newElement.value = content
        }

        
        if(blur) {
            let validData = this.validate(newElement)
            newElement.valid = validData[0]
            newElement.validationMessage = validData[1]
        }
        newElement.touched = blur
        newFormData[id] = newElement
        this.setState(() => ({
           formdata: newFormData,
           postError: null
        }))
    
        
    }

    storeFilename = (filename) => {
        this.updateForm({id: 'image'}, filename)
    }


    submitButton = () => {
        
        return this.state.loading ? 
            'loading...' 
        :
        <div>
            <button type="submit">Add Post</button>
           
        </div>

    }

    render() {
        return (
            <div className={styles.postContainer}>
                <form onSubmit={this.submitForm}>s
                    <h2>Add Post</h2>
                    <Uploader
                        setFilename={this.storeFilename}/>
                    <FormField
                        id={'author'}
                        formdata={this.state.formdata.author}
                        change={this.updateForm}/>
                    <FormField
                        id={'title'}
                        formdata={this.state.formdata.title}
                        change={this.updateForm}/>
                    {/*<Editor
                        editorState={this.state.editorState}
                        wrapperClassName="myEditor-wrapper"
                        editorClassName="myEditor-editor"
                    onEditorStateChange={this.onEditorStateChange}/>*/}
                    {<FormField
                        id={'team'}
                        formdata={this.state.formdata.team}
                    change={this.updateForm}/>}
                    
                        
                    
                    {this.submitButton()}
                    {!!this.state.postError && <div>{this.state.postError}</div>}

                </form>
            </div>
        );
    }
}

export default Dashboard;