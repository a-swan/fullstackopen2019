import React, {useState, useEffect} from 'react';
import loginService from './services/login'
import blogService from './services/blogs'
import Blog from './components/Blog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
      blogService.getAll()
        .then(initBlogs => setBlogs(initBlogs))
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try{
      const user = await loginService.login({username, password})

      setUser(user)
      console.log(user)
      setUsername(username)
      setPassword(password)
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
            <input type="text" value={username} onChange={({target}) => setUsername(target.value)} />
          </div>
          <div>
            password 
            <input type="text" value={password} onChange={({target}) => setPassword(target.value)} />
          </div>

          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
  
}

export default App;
