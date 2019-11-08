const listHelper = require('../utils/list_helper').totalLikes

const blogs = [
    {
        "title": "The Adults in the Room",
        "author": "Megan Greenwell",
        "url": "https://theconcourse.deadspin.com/the-adults-in-the-room-1837487584",
        "likes": 6148,
        "id": "5dc408091c9d44000046c91f"
    },
    {
        "title": "You're Not Going to Remember Any of this Shit: The Joker, Reviewed",
        "author": "Felix Beiderman",
        "url": "https://theconcourse.deadspin.com/youre-not-going-to-remember-any-of-this-shit-joker-re-1838770612",
        "likes": 3351,
        "id": "5dc408a61c9d44000046c923"
    },
    {
        "title": "This is How It's Going to Work",
        "author": "Drew Magary",
        "url": "https://drewmagary.kinja.com/this-is-how-it-s-gonna-work-1839505029",
        "likes": 2581,
        "id": "5dc409391c9d44000046c925"
    },
    {
        "title": "How An Inner-City Minnesota High School Built a Girls’ Badminton Dynasty",
        "author": "Sarah Barker",
        "url": "https://deadspin.com/how-an-inner-city-minnesota-high-school-built-a-girls-1825873078",
        "likes": 483,
        "id": "5dc40c3ccb2ee00f84133eaa"
    }
]

describe('totalLikes', () => {
    test('total likes of empty', () => {
        const result = listHelper([])
        expect(result).toBe(0)
    })

    test('total likes of one', () => {
        const result = listHelper([blogs[0]])
        expect(result).toBe(6148)
    })

    test('total likes of many', () => {
        const result = listHelper(blogs)
        expect(result).toBe(12563)
    })
})