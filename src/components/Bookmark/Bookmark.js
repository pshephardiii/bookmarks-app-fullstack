import styles from './Bookmark.module.scss'
import { useRef, useState } from 'react'



export default function Bookmark({ bookmark, buttonAction1, buttonText1, inputAction1}){
    const [showInput, setShowInput] = useState(false)
    const [showURLInput, setShowURLInput] = useState(false)
    const inputRef = useRef(null)
    const URLRef = useRef(null)
    return(
        <div className={styles.bookmarklist}>
        <div className={styles.bookmark}> 
            <h4 onClick={() => { 
              setShowInput(!showInput) 
              if (showURLInput) {
                setShowURLInput(false)
              }
             }
            }
            >{bookmark.title}</h4>
            <input
              ref={inputRef}
              style={{ display: showInput ? 'inline-block' : 'none'}}
              type="text"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const title = inputRef.current.value
                  inputAction1(bookmark._id, { title })
                  setShowInput(false)
                }
              }}
              defaultValue={bookmark.title}
            />
            <button
              style={{ display: showInput ? 'inline-block' : 'none'}}
              className={styles.URLButton}
              onClick={() => {
                setShowURLInput(true)
                setShowInput(false)
              }}
            >
              Edit URL
            </button>
            <input
              ref={URLRef}
              style={{ display: showURLInput ? 'inline-block' : 'none'}}
              type="text"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const url = URLRef.current.value
                  inputAction1(bookmark._id, { url })
                  setShowURLInput(false)
                }
              }}
              defaultValue={bookmark.url}
            />
            <h6><a href={bookmark.url} className={styles.a}
            style={{display: showInput || showURLInput ? 'none' : 'block' }}
            >link</a></h6>
            <button 
                className={styles.button}
                id="delete-btn"
                style={{ display: showInput || showURLInput ? 'none' : 'block '}}
                onClick={() => buttonAction1(bookmark._id)}
            >
                {buttonText1}
            </button>
        </div>
        </div>
    )
}

