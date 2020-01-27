import React, {useState} from 'react'

const Blog = ({ blog, handleUpdate }) => {
  const [visible, setVisibility] = useState(false)

  // const hideWhenVisible = {display: visible ? 'none' : ''}
  const showWhenVisible = {display: visible ? '' : 'none'}

  const toggleVisibility = () => {
    setVisibility(!visible)
  }

  const blogStyle = {
    border: 'solid',
    borderWidth: 1,
    padding: 5,
    margin: 5
  }

  return (
    <div style={blogStyle}>
      <div>
        <div onClick={toggleVisibility}>{blog.title} {blog.author}</div>
      </div>
      <div style={showWhenVisible}>
        {blog.url}<br/>
        {blog.likes} likes<button onClick={handleUpdate}>like</button><br/>
        added by {blog.user.name}<br/>
      </div>
    </div>
  )
}

export default Blog