const { model, Schema } = require('mongoose')


const bookmarkSchema = new Schema ({
    title: { required: true, type: String },
    url: { required: true, type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true
})

const Bookmark = model('Bookmark', bookmarkSchema)

module.exports = Bookmark