import React, {useState, useEffect} from 'react';
import loginService from './services/login'
import blogService from './services/blogs'
import Blog from './components/Blog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
      blogService.getAll()
        .then(initBlogs => setBlogs(initBlogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try{
      const user = await loginService.login({username, password})

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      console.log(user)
      setUsername('')
      setPassword('')
    }catch(exception) {
      console.log('Wrong Credentials')
    }
  }
  
  if(user === null){
    return(
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username 
            <input type="text" value={username} name="Username" onChange={({target}) => setUsername(target.value)} />
          </div>
          <div>
            password 
            <input type="password" value={password} name="Password" onChange={({target}) => setPassword(target.value)} />
          </div>

          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  const blogForm = () => (
    <h2>create new</h2>
    <form onSubmit={addBlog}>
      title:<input value={newTitle} onChange={handleTitleChange} /><br />
      author:<input value={newAuthor} onChange={handleAuthorChange} /><br />
      url:<input value={newUrl} onChange={handleUrlChange} /><br />
      <button type="submit">save</button>
    </form>
  )

  const handleTitleChange = (event) =>{
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) =>{
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) =>{
    setNewUrl(event.target.value)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    const data = await blogService.create(blogObject)
    setBlogs(blogs.concat(data))
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={() => setUser(null)}>logout</button></p>

      {blogForm()}

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
  
}

export default App;
