import React, {useState} from 'react';
import styles from './ForgotForm.module.css';

function ForgotForm(props)
{
    const[user, setUser] = useState(
        {
            name: '',
        }
    );

    function handleChange(event){
        const{value} = event.target;
            setUser({name:value});
    }

    function submitForm(){
        props.handleSubmit(user);
        setUser({name:''})
    }
    
    return(
        <form>
            <div>
            <input className={styles.userInput}
                type = "text"
                name = "name"
                id = "name"
                value = {user.name}
                onChange = {handleChange}
                placeholder="Enter your e-mail"/>
            </div>
            <div className={styles.button}>
                <input className={styles.submitForgot}
                    type = "button"
                    value = "Send Password"
                    onClick = {submitForm}/>
            </div>
        </form>
    )
}
export default ForgotForm;