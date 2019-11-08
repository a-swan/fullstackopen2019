const _ = require('lodash')

const totalLikes = (blogs) => {
    const sumLikes = 0

    return blogs.reduce((sumLikes, iter) => {
        return sumLikes + iter.likes
    }, 0)
}

const favoriteBlog = (blogs) => {
    if(blogs.length > 0){
        return blogs.reduce((fav, iter) => {
            return fav.likes < iter.likes ? fav = iter : fav = fav
        })
    }
    
    return {}
}

const mostBlogs = (blogs) => {
    //if(blogs.length > 0){
        const authors = _.reduce(blogs, (result, value, key) => {
            ((result[value.author]) || (result[value.author] = [])).push(key)

            return result
        }, {}) 

        // console.log(`${authors} ${_.isEmpty(authors)}`)

        const authSorted = Object.keys(authors).sort((acc, iter) => {
            return authors[iter].length - authors[acc].length
        })

        // console.log(authSorted)

        return (_.isEmpty(authors) ? {} : {"author": authSorted[0],"blogs": authors[authSorted[0]].length})
    //}
}

module.exports = {
    totalLikes,
    favoriteBlog,
    mostBlogs
}