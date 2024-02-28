import Bookmark from '../../components/Bookmark/Bookmark'
import styles from './Bookmarklist.module.scss'

export default function BookmarkList(props) {
    return(<div className={styles.bookmarkList}>
        {props.bookmarks.map((bookmark) => 
            
            <Bookmark key={bookmark._id} bookmark={bookmark} user={props.user} setUser={props.user} token={props.token} setToken={props.token} updateBookmark={props.updateBookmark} deleteBookmark={props.deleteBookmark}></Bookmark>
        )}
    </div>)
}


