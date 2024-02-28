import { useState, useEffect } from 'react'
import CreateForm from '../../components/CreateForm/CreateForm'
import BookmarkList from '../../components/BookmarkList/BookmarkList'
import styles from './HomePage.module.scss'

export default function HomePage (props) {
    const [bookmarks, setBookmarks] = useState([])
    const [showCreate, setShowCreate] = useState(false)

    useEffect(() => {
        const fetchBookmarks = async () => {
            try {
                const data = await props.getBookmarks()
                setBookmarks(data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchBookmarks()
    }, [])
    
    useEffect(() => {
        if (localStorage.token && !props.token) {
            props.setToken(localStorage.getItem('token'))
            setShowCreate(true)
        }
        if(localStorage.token && localStorage.user && !props.user) {
            props.setUser(JSON.parse(localStorage.getItem('user')))
        }
    }, [])
    

    return (
        <div className={styles.homePage}>
            <h1 className={styles.header}>Your Personalized Bookmarks</h1>
            { showCreate ? <CreateForm user={props.user} createBookmark={props.createBookmark} token={props.token} /> : <></> }
            { bookmarks.length ? <BookmarkList bookmarks={bookmarks} token={props.token} setToken={props.token} user={props.user} setUser={props.user} updateBookmark={props.updateBookmark} deleteBookmark={props.deleteBookmark} /> : 'No Bookmarks Yet!' }
        </div>
    )
}