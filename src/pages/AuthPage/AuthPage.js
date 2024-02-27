import { useState } from 'react'
import LoginForm from "../../components/LoginForm/LoginForm"
import SignUpForm from "../../components/SignUpForm/SignUpForm"
import styles from "./AuthPage.module.scss"

export default function AuthPage (props) {
    const [showLogin, setShowLogin] = useState(true)
    return(
        <div className={styles.formContainer}>
            <button
            className={styles.button} 
            onClick={() => setShowLogin(!showLogin)}>{showLogin ? 'Click Here to Sign Up' : 'Click Here to Log In'}</button>
            { !showLogin ? <SignUpForm signUp={props.signUp}/> : <LoginForm login={props.login}/>}
        </div>
    )
}