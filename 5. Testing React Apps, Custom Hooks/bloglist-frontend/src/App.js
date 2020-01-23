import React, {useState, useEffect} from 'react';
import loginService from './services/login'
import blogService from './services/blogs'
import Blog from './components/Blog'
import ErrorMessage from './components/ErrorMessage'
import Notificatoin from './components/Notification'
import BlogForm from './components/BlogForm'
import Toggleable from './components/Toggleable'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [notification, setNotification] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = React.createRef()

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
      setErrorMessage('Wrong Credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

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

    try{
      const data = await blogService.create(blogObject)
      setBlogs(blogs.concat(data))
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
      setNotification(`a new blog ${newTitle} by ${newAuthor} added`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }catch(exception){
      console.log(exception)
      setErrorMessage(exception.error)
      setTimeout(() => {
        setErrorMessage(null)
      })
    }
  }

  // const loginForm = () => {
  //   return(
  //     <div>
  //       <LoginForm
  //         handleSubmit={handleLogin}
  //         username={username}
  //         handleUsernameChange={({target}) => setUsername(target.value)}
  //         password={password}
  //         handlePasswordChange={({target}) => setPassword(target.value)}
  //       />
  //     </div>
  //   )
  // }

  const loginForm = () => {
    return(
      <div>
        <Toggleable buttonLabel="log in">
          <LoginForm
            handleSubmit={handleLogin}
            username={username}
            handleUsernameChange={({target}) => setUsername(target.value)}
            password={password}
            handlePasswordChange={({target}) => setPassword(target.value)}
          />
        </Toggleable>        
      </div>
    )
  }

  const blogForm = () => {
    return(
      <div>
        <p>{user.name} logged in <button onClick={() => setUser(null)}>logout</button></p>

        <Toggleable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm
            handleSubmit={addBlog}
            handleAuthorChange={handleAuthorChange}
            handleTitleChange={handleTitleChange}
            handleUrlChange={handleUrlChange}
            author={newAuthor}
            title={newTitle}
            url={newUrl}
          />
        </Toggleable>

        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <ErrorMessage message={errorMessage}/>
      <Notificatoin message={notification} />

      {user === null ? loginForm() : blogForm()}
    </div>
  )
  
}

export default App;
