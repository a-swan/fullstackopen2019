import React from 'react'


const Blog = ({ blog }) => {
  const blogStyle = {
    border: 'solid',
    borderWidth: 1,
    padding: 5,
    margin: 5
  }

  return (
    <div style={blogStyle} onClick={() => console.log('clicked', blog.title)}>
      {blog.title} {blog.author}
    </div>
  )
}

export default Blog