import React from 'react';
import styles from './formFields.css'

const FormFields = ({formdata, change, id}) => {
    

    const showError = () => {
        let errorMessage = null

        if(formdata.validation && !formdata.valid && formdata.touched){
            errorMessage = (
                <div>
                    {formdata.validationMessage}
                </div>
            )
        }

        return errorMessage
    }

    

    const renderTemplate = () => {
        
        switch (formdata.element) {
            
            case 'input' : 
                return (
                    <div>
                        <input {...formdata.config}
                                value={formdata.value}
                                onChange={(event) => change({event, id, blur: false})}
                                onBlur={(event) => change({event, id, blur: true})}/>
                        { showError() }
                    </div>)
            case 'select' :
                return (
                    <select
                        value={formdata.value}
                        name={formdata.config.name}
                        onChange={(event) => change({event, id, blur: false})}
                        onBlur={(event) => change({event, id, blur: true})}>
                        {formdata.config.options.map((element, i) => (
                            <option key={i} value={element.id}>{element.name}</option>
                        )
                        )}
                    </select>
                )
                
            default:
                return null
                
        }
    }

    return (
        <div>
            {renderTemplate()}
        </div>
    );
};

export default FormFields;