import { useState, useEffect } from 'react'
import CreateForm from '../../components/CreateForm/CreateForm'
import BookmarkList from '../../components/BookmarkList/BookmarkList'

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
        <div>
            <h1>Create a new Bookmark Below</h1>
            { showCreate ? <CreateForm user={props.user} createBookmark={props.createBookmark} token={props.token} /> : <></> }
            { bookmarks.length ? <BookmarkList bookmarks={bookmarks}/> : 'No Bookmarks Yet!' }
        </div>
    )
}