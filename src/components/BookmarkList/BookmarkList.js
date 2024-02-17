import styles from './BookmarkList.module.scss'
import Bookmark from '../Bookmark/Bookmark'

 
export default function BookmarkList ({ 
    newBookmark, 
    createBookmark, 
    setNewBookmark, 
    allBookmarks,
    deleteBookmark,
    updateBookmark
}){
    // try creating two hidden inputs that come out when update button is pressed
    return(
        <ul>
        <div className={styles.bookmarklist}>
            Add New Bookmark:<input 
            className={styles.input}
            id="bookmark-title-input"
            type="text" 
            value={newBookmark.title}
            placeholder="website"
            onChange={(e) => {
                setNewBookmark({...newBookmark, title: e.target.value, url: document.getElementById("bookmark-url-input").value})
            }}
            />
            <input
            className={styles.input}
            id="bookmark-url-input"
            type="text"
            value={newBookmark.url}
            placeholder="http://"
            onChange={(e) => {
                setNewBookmark({...newBookmark, title: document.getElementById("bookmark-title-input").value, url: e.target.value})
              }}
            />
            <button 
                onClick={() => {
                createBookmark()
            }} 
            >
            </button>
             <h3>All Bookmarks</h3>
        {allBookmarks.map(bookmark => (
            <Bookmark 
                key={bookmark._id} 
                bookmark={bookmark}
                inputAction1 = {updateBookmark} 
                buttonAction1={deleteBookmark}
                buttonText1={'X'}
            />
        ))}
        </div>
        </ul>
    )
}