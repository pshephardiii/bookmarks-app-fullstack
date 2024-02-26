const express = require('express')
const router = express.Router()
const bookmarkCtrl = require('../../controllers/api/bookmarks')
const userCtrl = require('../../controllers/api/users')

// Index
router.get('/', bookmarkCtrl.index, bookmarkCtrl.jsonBookmarks)
// Delete
router.delete('/:id', userCtrl.auth, bookmarkCtrl.destroy, bookmarkCtrl.jsonBookmark)
// Update
router.put('/:id', userCtrl.auth, bookmarkCtrl.update, bookmarkCtrl.jsonBookmark)
// Create
router.post('/', userCtrl.auth, bookmarkCtrl.create, bookmarkCtrl.jsonBookmark)


module.exports = router