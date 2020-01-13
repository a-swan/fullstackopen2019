const Blog = require('../models/blog')
const User = require('../models/user')

const initBlogs = [
    {
        title: "The Adults in the Room",
        author: "Megan Greenwell",
        url: "https://theconcourse.deadspin.com/the-adults-in-the-room-1837487584",
        likes: 6148
    },
    {
        title: "You're Not Going to Remember Any of this Shit: The Joker, Reviewed",
        author: "Felix Beiderman",
        url: "https://theconcourse.deadspin.com/youre-not-going-to-remember-any-of-this-shit-joker-re-1838770612",
        likes: 3351
    },
    {
        title: "How An Inner-City Minnesota High School Built a Girls' Badminton Dynasty",
        author: "Sarah Barker",
        url: "https://deadspin.com/how-an-inner-city-minnesota-high-school-built-a-girls-1825873078",
        likes: 483
    },
    {
        title: "This is How It's Going to Work",
        author: "Drew Magary",
        url: "https://drewmagary.kinja.com/this-is-how-it-s-gonna-work-1839505029",
        likes: 2581
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initBlogs, blogsInDb, usersInDb
}