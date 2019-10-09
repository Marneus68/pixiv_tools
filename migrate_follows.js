const PixivAppApi = require('pixiv-app-api')

const pixiv = new PixivAppApi(process.env.NAME, process.env.PASSWORD)
const pixiv_ = new PixivAppApi(process.env.NAME, process.env.PASSWORD)

function followActions(follow, first) {
    follow.userPreviews.forEach((f) => { 
        pixiv.userFollowAdd(f.user.id, { "userId": first.user.id })
            .then(() => console.log("Now following " + f.user.name + " on " + first.user.name))
            .catch((e) => console.log("https://www.pixiv.net/member.php?id=" + f.user.id))
    });
    if (follow.nextUrl) {
        pixiv.fetch(follow.nextUrl)
            .then((ff) => {
                followActions(ff, first);
            });
    }
}

pixiv.login(process.argv[2], process.argv[3])
    .then((first) => {
        pixiv_.login(process.argv[4], process.argv[5])
            .then((second) => {
                pixiv_.userFollowing(second.user.id)
                    .then((follow) => { 
                        followActions(follow, first);
                    })
            })
            .catch((e) => console.log(e.message))
    })
    .catch((e) => console.log(e.message))
