import React, {useState} from 'react';
import CreateForm from './CreateForm';
import styles from './Login.module.css';
import axios from 'axios';

function CreateNew() {
    const [user, setUser] = useState([]);

    async function makePostCall(user){
       try {
           const response = await axios.post('http://localhost:5000/signup', user);
           return response;
        }
        catch (error) {
           console.log(error);
           return false;
        }
    }

   function createUser(user){
       makePostCall(user).then(result => {
           if(result) //Reroute to page here
               return result;
       });
   }

    return(
        <div className={styles.overlay}>
            <div className={styles.content}>
                <h1 className={styles.name}>New Account</h1>
                <CreateForm handleSubmit={createUser}/>
            </div> 
            <div className={styles.title}>
                <text className={styles.lb}>LEARN BY</text><text className={styles.plan}> PLANNING</text>
            </div>
        </div>
            
    )
}

export default CreateNew;