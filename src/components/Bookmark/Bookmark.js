import styles from './Bookmark.module.scss'
import { useRef, useState } from 'react'



export default function Bookmark({ bookmark, buttonAction1, buttonText1, inputAction1}){
    const [showInput, setShowInput] = useState(false)
    const inputRef = useRef(null)
    return(
        <div className={styles.bookmarklist}>
        <div className={styles.bookmark}> 
            <h4 onClick={() => setShowInput(!showInput) 
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
             {/* <input
              ref={inputRef}
              style={{ display: showInput ? 'inline-block' : 'none'}}
              type="text"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const url = inputRef.current.value
                  inputAction1(bookmark._id, { url })
                  setShowInput(false)
                }
              }}
              defaultValue={bookmark.url}
            /> */}
            {/* couldn't get second input to work for some reason... it caused the inputs to get confused and sometimes made the bookmark's title the url. Will need to investigate */}
            <h6><a href={bookmark.url} className={styles.a}
            style={{display: showInput ? 'none' : 'block' }}
            >link</a></h6>
            <button 
                className={styles.button}
                id="delete-btn"
                style={{ display: showInput ? 'none' : 'block '}}
                onClick={() => buttonAction1(bookmark._id)}
            >
                {buttonText1}
            </button>
        </div>
        </div>
    )
}

