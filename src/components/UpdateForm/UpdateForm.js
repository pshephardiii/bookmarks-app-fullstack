import styles from './UpdateForm.module.scss'
import { useState, useRef } from 'react'

export default function UpdateForm(props) {

    const titleInputRef = useRef(null)
    const urlInputRef = useRef(null)

    const [bookmark, setBookmark] = useState({
        title: '',
        url:'',
        user: ''
    })

    const handleSubmit = async (e) => {
        try {
            const title = titleInputRef.current.value
            const url = urlInputRef.current.value
            let data = props.bookmark
            data.title = title
            data.url = url
            await props.updateBookmark(data, props.bookmark._id, props.token)
            props.setShowUpdate(false)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <form className={styles.updateForm}>
            <div className={styles.inputContainer}>
                <input className={styles.input} ref={titleInputRef} placeholder="Title" type="text" name="title" defaultValue={props.bookmark.title} 
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSubmit()
                    }}}/>
                <input className={styles.input} ref={urlInputRef} placeholder="URL" type="url" name="url" defaultValue={props.bookmark.url}  
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSubmit()
                    }}}/>
            </div>
        </form>
    )
}