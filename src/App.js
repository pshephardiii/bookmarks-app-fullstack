import { useState, useEffect } from 'react'
import AuthPage from './pages/AuthPage/AuthPage'
import HomePage from './pages/HomePage/HomePage'
import { Route, Routes } from 'react-router-dom'
import BookmarkList from './components/BookmarkList/BookmarkList'
import styles from './App.module.scss'

export default function App(){
    const [user, setUser] = useState(null)
    const [token, setToken] = useState('')
 
    const signUp = async (credentials) => {
        try {
            const response = await fetch('/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            })
            const data = await response.json()
            setUser(data.user)
            localStorage.setItem('token', data.token)
            localStorage.setItem('user', JSON.stringify(data.user))
        } catch (error) {
            console.error(error)
        }
    }

    const login = async (credentials) => {
        try {
            const response = await fetch('/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            })
            const data = await response.json()
            const tokenData = data.token
            localStorage.setItem('token', tokenData)
            setToken(tokenData)
            const userData = data.user
            localStorage.setItem('user', JSON.stringify(userData))
            setUser(userData)
        } catch (error) {
            console.error(error)
        }
    }

    //createBookmark
    const createBookmark = async (blogData, token) => {
        if (!token) {
            return
        }
        try {
            const response = await fetch('/api/bookmarks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(blogData)
            })
            const data = await response.json()
            return data
        } catch (error) {   
            console.error(error)
        }
    }

    //updateBookmark

    const updateBookmark = async (newBlogData, id, token) => {
        if (!token) {
            return
        }
        try {
            const response = await fetch(`/api/bookmarks/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newBlogData)
            })
            
            const data = await response.json()
            return data
        } catch (error) {
            console.error(error)
        }
    }


    //deleteBookmark
    const deleteBookmark = async (id, token) => {
        if (!token) {
            return
        }
        try {
            const response = await fetch(`/api/bookmarks/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const data = await response.json()
            return data
        } catch (error) {
            console.error(error)
        }
    }

    //getBookmarks
    const getBookmarks = async () => {
        try{
            const response = await fetch('/api/bookmarks')
            const data = await response.json()
            return data
        } catch(error){
            console.error(error)
        }
    }
    // useEffect(() => {
    //     getBookmarks()
    // }, [])
    return(

        <div className={styles.App}>
            <div className={styles.banner}>
                <h1>Bookmarks</h1>
            </div>
            <Routes>
                <Route path="/" element={
                <HomePage
                    user={user}
                    token={token}
                    setToken={setToken}
                    setUser={setUser}
                    getBookmarks={getBookmarks}
                    createBookmark={createBookmark}
                    deleteBookmark={deleteBookmark}
                    updateBookmark={updateBookmark}
                />}></Route>
                <Route path="/register" element={
                <AuthPage
                    setUser={setUser}
                    setToken={setToken}
                    signUp={signUp}
                    login={login}
                />}></Route>
            </Routes>
        </div>



        // <>
			
        //     <div className={styles.banner}>
        //         <h1>Bookmarks</h1>
        //     </div>
        //     <BookmarkList
        //     newBookmark={newBookmark}
        //     setNewBookmark={setNewBookmark}
        //     createBookmark={createBookmark}
        //     updateBookmark={updateBookmark}
        //     allBookmarks={allBookmarks}
        //     deleteBookmark={deleteBookmark}
        //     />
        // </>
    )
}