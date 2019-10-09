const PixivAppApi = require('pixiv-app-api')

const pixiv = new PixivAppApi(process.env.NAME, process.env.PASSWORD)
const pixiv_ = new PixivAppApi(process.env.NAME, process.env.PASSWORD)

function bookmarkAction(bookmarks, first) {
    bookmarks.illusts.forEach((f) => { 
        pixiv.illustBookmarkAdd(f.id)
            .then(() => console.log("Bookmarked " + f.title + " on " + first.user.name))
            .catch((e) => console.log("Bookmarked " + f.title + " on " + first.user.name))
    })
    if (bookmarks.nextUrl) {
        pixiv.fetch(bookmarks.nextUrl)
            .then((bb) => {
                bookmarkAction(bb, first);
            })
    }
}

pixiv.login(process.argv[2], process.argv[3])
    .then((first) => {
        pixiv_.login(process.argv[4], process.argv[5])
            .then((second) => {
                pixiv_.userBookmarksIllust(second.user.id)
                    .then((bookmarks) => { 
                        bookmarkAction(bookmarks, first);
                    })
            })
            .catch((e) => console.log(e.message))
    })
    .catch((e) => console.log(e.message))
