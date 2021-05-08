import React, {useState} from 'react';
import ForgotForm from './ForgotForm';
import styles from './Login.module.css';

function Forgot() {
     const [user, setUser] = useState([]);

    function updateList(person){
        setUser(person);
    }

    return(
        <div className={styles.overlay}>
            <div className={styles.content}>
                <h1 className={styles.name}>Forgot Password</h1>
                <ForgotForm handleSubmit={updateList}/>
            </div> 
            <div className={styles.title}>
                <text className={styles.lb}>LEARN BY</text><text className={styles.plan}> PLANNING</text>
            </div>
        </div>
            
    )
}

export default Forgot;