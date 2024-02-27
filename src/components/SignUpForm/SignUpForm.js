import { useState } from 'react'
import styles from './SignUpForm.module.scss'


export default function SignUpForm (props) {

    const [credentials, setCredentials] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value })
    } 
    return(
        <>
        
            <h2 className={styles.heading}>Sign Up Below</h2>
            <form className={styles.form} onSubmit={(e) => {
                e.preventDefault()
                props.signUp(credentials)
            }}>
                <input className={styles.formInput} type='text' name="name" placeholder="name" onChange={handleChange} value={credentials.name} />
                <input className={styles.formInput} type='email' name="email" placeholder="email" onChange={handleChange} value={credentials.email} />
                <input className={styles.formInput} type='password' name="password" placeholder="password" onChange={handleChange} value={credentials.password} />
                <input className={styles.formSubmit} type="submit" value="Submit" />
            </form>
        </>
    )
} 