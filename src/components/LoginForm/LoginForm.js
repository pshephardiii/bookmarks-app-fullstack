import { useState } from 'react'
import styles from './LoginForm.module.scss'


export default function LoginForm (props) {

    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value })
    } 
    return(
        <>
        
            <h2 className={styles.heading}>Log in Below</h2>
            <form className={styles.form} onSubmit={(e) => {
                e.preventDefault()
                props.login(credentials)
            }}>
                <input className={styles.formInput} type='email' name="email" placeholder="email" onChange={handleChange} value={credentials.email} />
                <input className={styles.formInput} type='password' name="password" placeholder="password" onChange={handleChange} value={credentials.password} />
                <input className={styles.formSubmit} type="submit" value="Submit" />
            </form>
        </>
    )
} 