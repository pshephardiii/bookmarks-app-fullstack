import { useEffect, useState } from 'react'
import styles from './CreateForm.module.scss'


export default function CreateForm(props) {
    const [ formData, setFormData ] = useState({
        title: '',
        url: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await props.createBookmark(formData, props.token)
        } catch (error) {
            console.error(error)
        }
    }

     const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value })
    }


    return (
      <form className={styles.form} >
        <h2 className={styles.h2}>Create A New Bookmark, {props.user.name}</h2>
        <div className={styles.inputContainer}>
            <input className={styles.input} placeholder="Title" type="text" name="title" value={formData.title} onChange={handleChange} />
            <input className={styles.input} placeholder="URL" type="url" name="url" value={formData.url} onChange={handleChange} />
            <input className={styles.submit} type="submit" value="Create" onClick={handleSubmit}/>
        </div>
      </form>
    )
}