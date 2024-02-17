import { useState, useEffect } from 'react'
import BookmarkList from './components/BookmarkList/BookmarkList'
import Bookmark from './components/Bookmark/Bookmark'
import styles from './App.module.scss'


export default function App(){
    const [allBookmarks, setBookmarks] = useState([])
    const [newBookmark, setNewBookmark] = useState({
        title: '',
        url: ''
    })

    //createBookmark
    const createBookmark = async () => {
        const body = {...newBookmark}
        try {
            const response = await fetch('/api/bookmarks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            const createdBookmark = await response.json()
            const bookmarksCopy = [createdBookmark,...allBookmarks]
            setBookmarks(bookmarksCopy)
            setNewBookmark({
                title: '',
                url: ''
            })
        } catch (error) {   
            console.error(error)
        }
    }

    //updateBookmark

    const updateBookmark = async (id, subject) => {
      try {
        const response = await fetch(`/api/bookmarks/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(subject)
        })
        const index = allBookmarks.findIndex((bookmark) => id === bookmark._id)
        const allBookmarksCopy = [...allBookmarks]
        const data = await response.json()
        allBookmarksCopy[index] = {...allBookmarksCopy[index], ...subject}
        setBookmarks(allBookmarksCopy)
      } catch (error) {
        console.error(error)
      }
    }


    //deleteBookmark
    const deleteBookmark = async (id) => {
        try {
            const index = allBookmarks.findIndex((bookmark) => bookmark._id === id)
            const allBookmarksCopy = [...allBookmarks]
            const response = await fetch(`/api/bookmarks/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            await response.json()
            allBookmarksCopy.splice(index, 1)
            setBookmarks(allBookmarksCopy)
        } catch (error) {
            console.error(error)
        }
    }
    //getBookmarks
    const getBookmarks = async () => {
        try{
            const response = await fetch('/api/bookmarks')
            const foundBookmarks = await response.json()
            setBookmarks(foundBookmarks.reverse())
        } catch(error){
            console.error(error)
        }
    }
    useEffect(() => {
        getBookmarks()
    }, [])
    return(
        <>
			
            <div className={styles.banner}>
                <h1>Bookmarks</h1>
            </div>
            <BookmarkList
            newBookmark={newBookmark}
            setNewBookmark={setNewBookmark}
            createBookmark={createBookmark}
            updateBookmark={updateBookmark}
            allBookmarks={allBookmarks}
            deleteBookmark={deleteBookmark}
            />
        </>
    )
}