import React from 'react'

const BlogForm = ({
  handleSubmit,
  author,
  title,
  url
}) => {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
                title:<input type={title.type} value={title.value} onChange={title.onChange} /><br />
                author:<input type={author.type} value={author.value} onChange={author.onChange} /><br />
                url:<input type={url.type} value={url.value} onChange={url.onChange} /><br />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default BlogForm