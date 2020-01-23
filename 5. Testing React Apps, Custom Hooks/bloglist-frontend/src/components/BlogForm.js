import React from 'react'

const BlogForm = ({
    handleSubmit,
    handleAuthorChange,
    handleTitleChange,
    handleUrlChange,
    author,
    title,
    url
}) => {
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={handleSubmit}>
                title:<input value={title} onChange={handleTitleChange} /><br />
                author:<input value={author} onChange={handleAuthorChange} /><br />
                url:<input value={url} onChange={handleUrlChange} /><br />
                <button type="submit">save</button>
            </form>
        </div>
    )
}

export default BlogForm