import React, {useState, useImperativeHandle} from 'react'

const Blog = ({ blog }) => {
  const [visible, setVisibility] = useState(false)

  const hideWhenVisible = {display: visible ? 'none' : ''}
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
    <div style={blogStyle} onClick={() => console.log('clicked', blog.title)}>
      <div>
        <div onClick={toggleVisibility}>{blog.title} {blog.author}</div>
      </div>
      <div style={showWhenVisible}>
        {blog.url}<br/>
        {blog.likes} likes<br/>
        added by {blog.user.name}<br/>
      </div>
    </div>



    // <div style={blogStyle} onClick={() => console.log(blog)}>
    //   <Toggleable buttonLabel={`${blog.title} ${blog.author}`}>
    //     {blog.title} {blog.author}<br/>
    //     {blog.url}<br/>
    //     {blog.likes} likes<br/>
    //     added by {blog.user.name}<br/>
    //   </Toggleable>
    // </div>
  )
}

export default Blog