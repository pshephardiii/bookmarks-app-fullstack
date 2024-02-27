import { useState } from 'react'
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
      <form onSubmit={handleSubmit}>
        <h2>Create A New Bookmark, {props.user.name}</h2>
        <input placeholder="Title" type="text" name="title" value={formData.title} onChange={handleChange} />
        <input placeholder="URL" type="url" name="url" value={formData.url} onChange={handleChange} />
        <input type="submit" value="Create Bookmark" />
      </form>
    )
}