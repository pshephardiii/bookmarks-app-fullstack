import UpdateForm from '../../components/UpdateForm/UpdateForm'
import styles from './Bookmark.module.scss'
import { useState, useEffect } from 'react'


export default function Bookmark(props){
    const [showUpdate, setShowUpdate] = useState(false)
    const [allowChanges, setAllowChanges] = useState(false)


    useEffect(() => {
      if (localStorage.token && !props.token) {
          props.setToken(localStorage.getItem('token'))
      }
      if(localStorage.token && localStorage.user && !props.user){
          props.setUser(JSON.parse(localStorage.getItem('user')))
      }
  }, [])

  useEffect (() => {
      if (props.bookmark && props.user._id === props.bookmark.user) {
              setAllowChanges(true)
      }
  }, [props.user, props.bookmark])

  const handleDelete = async () => {
      try {
          await props.deleteBookmark(props.bookmark._id, props.token)
      } catch (error) {
          console.error(error)
      }
  }

    return(
      <div className={styles.bookmarklist}>
        <div className={styles.bookmark}> 
          <h4 
            className={styles.title}
            onClick={() => { 
            setShowUpdate(!showUpdate) 
            }}
          >
            {props.bookmark.title}
          </h4>
        
          {allowChanges && showUpdate ? <UpdateForm id={props.bookmark._id} updateBookmark={props.updateBookmark} setShowUpdate={setShowUpdate} bookmark={props.bookmark} token={props.token} setToken={props.token}/> : <></>}
          {allowChanges && !showUpdate ? <button className={styles.button} onClick={handleDelete}>Delete</button> : <></>}
          {!showUpdate ? <a className={styles.a} href={`${props.bookmark.url}`}>Link</a> : <></>}
        </div>
      </div>
    )
}

