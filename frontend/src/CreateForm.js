import React, {useState} from 'react';
import styles from './CreateForm.module.css';

function CreateFrom(props)
{
    const[user, setUser] = useState(
        {
            name: '',
            pass: '',
        }
    );

    function handleChange(event){
        const{name,value} = event.target;
        if(name === "pass")
            setUser({name:user['name'],pass:value});
        else
            setUser({name:value,pass:user['pass']});
    }

    function submitForm(){
        props.handleSubmit(user);
        setUser({name:'', pass:''})
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
                placeholder="E-Mail"/>
            </div>
            <div >
            <input className={styles.userInput}
                type = "text"
                name = "pass"
                id = "pass"
                value = {user.pass}
                onChange = {handleChange}
                placeholder="Password"/>
            </div>
            <div className={styles.button}>
                <input className={styles.submitNew}
                    type = "button"
                    value = "Create Account"
                    onClick = {submitForm}/>
            </div>
        </form>
    )
}
export default CreateFrom;