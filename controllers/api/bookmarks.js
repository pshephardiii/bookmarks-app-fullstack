const Bookmark = require('../../models/bookmark')


module.exports = {
    create,
    index,
    update,
    destroy,
    jsonBookmarks,
    jsonBookmark
}

function jsonBookmark (_, res) {
    res.json(res.locals.data.bookmark)
}

function jsonBookmarks (_, res) {
    res.json(res.locals.data.bookmarks)
}

/****** C - Create *******/
async function create(req, res, next){
    try {
        req.body.user = req.user._id
        const bookmark = await Bookmark.create(req.body)
        req.user.bookmarks.addToSet(bookmark)
        req.user.save()
        res.locals.data.bookmark = bookmark
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

/****** R - Read *****/

async function index(_, res ,next) {
    try {
        const bookmarks = await Bookmark.find({})
        res.locals.data.bookmarks = bookmarks
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

/****** U - Update *****/


async function update(req ,res,next) {
    try {
        const bookmark = await Bookmark.findByIdAndUpdate({ _id: req.params.id, user: req.user._id }, req.body, { new: true })
        res.locals.data.bookmark = bookmark
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

/***** D - destroy/delete *****/

async function destroy(req ,res,next) {
    try {
        const bookmark = await Bookmark.findByIdAndDelete({ _id: req.params.id, user: req.user._id })
        const user = await req.user
        const bookmarkIndex = user.bookmarks.indexOf(bookmark)
        user.bookmarks.splice(bookmarkIndex, 1)
        await user.save()
        res.locals.data.bookmark = bookmark
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}
