import styles from './Bookmark.module.scss'
import { useRef, useState } from 'react'



export default function Bookmark({ bookmark, buttonAction1, buttonText1, inputAction1}){
    const [showInput, setShowInput] = useState(false)
    const inputRef = useRef(null)
    return(
        <div className={styles.bookmark}> 
          <li>
            <h4 onClick={() => setShowInput(!showInput) }>{bookmark.title}</h4>
            <input
              ref={inputRef}
              style={{ display: showInput ? 'block' : 'none'}}
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
             <input
              ref={inputRef}
              style={{ display: showInput ? 'block' : 'none'}}
              type="text"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const url = inputRef.current.value
                  inputAction1(bookmark._id, { url })
                  setShowInput(false)
                }
              }}
              defaultValue={bookmark.url}
            />
            <h6><a href={bookmark.url}>{bookmark.url}</a></h6>
            <button 
                className={styles.button}
                id="delete-btn"
                onClick={() => buttonAction1(bookmark._id)}
            >
                {buttonText1}
            </button>
            </li>
        </div>
    )
}

