const listHelper = require('../utils/list_helper').mostLikes

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
        "author": "Felix Biederman",
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
    },
    {
        "title": "Rich Piana Lived As Big As He Was",
        "author": "Felix Biederman",
        "url": "https://deadspin.com/rich-piana-lived-as-big-as-he-was-1798428768",
        "likes": 3771,
        "id": "5dc40c3ccbpfc00f612eaa"
    }
]

describe('author with the most likes on blogs', () => {
    test('most likes in empty', () => {
        const result = listHelper([])
        expect(result).toEqual({})
    })

    test('most likes in single', () => {
        const result = listHelper([blogs[2]])
        expect(result).toEqual({
            "author": "Drew Magary",
            "likes": 2581
        })
    })
    
    test('most likes in list', () => {
        const result = listHelper(blogs)
        expect(result).toEqual({
            "author": "Felix Biederman",
            "likes": 7122
        })
    })
})