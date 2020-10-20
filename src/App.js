import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Alert from './components/Alert'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [Notification, setNotification] = useState('')
  const [blogVisible, setBlogVisible] = useState(false)



  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification('wrong credentials')
      setTimeout(() => {
        setNotification('')
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addNewBlog = (blogObject) => {

      blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNotification(`a new blog ${JSON.stringify(blogObject.title)} added`)
        setTimeout(() => {
          setNotification('')
        }, 5000)
        setBlogVisible(false)
      })
  }

  

  const sortByLikes = (blogsByLikes) => {
    blogsByLikes.sort((blog1, blog2) => blog2.likes - blog1.likes)
    setBlogs(blogsByLikes)
  }

  const giveLike = async (blog) => {
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id
    }
    await blogService.update(blog.id, blogObject)
    sortByLikes(await blogService.getAll())

  }
    
  

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>    
  )

  const blogForm = () => {
    const hideWhenVisible = { display: blogVisible ? 'none' : '' }
    const showWhenVisible = { display: blogVisible ? '' : 'none' }

    return(
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setBlogVisible(true)}>new blog</button>
        </div>
        <div style={showWhenVisible}>
          
          <BlogForm
            createBlog={addNewBlog}
          />
          <button onClick={() => setBlogVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }
  
  if (user === null) {

    return (
      <div>
        <Alert message={Notification}/>
        <h2>Log in to application</h2>
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <Alert message={Notification}/>
      <p>{user.name} logged in <button onClick={handleLogout}>log out</button></p>
      {blogForm()}
      <h2>blogs</h2>
      {blogs.sort((blog1, blog2) => blog2.likes - blog1.likes).map(blog =>
        <Blog key={blog.id} blog={blog} user={user} giveLike={giveLike} blogs={blogs} setBlogs={setBlogs}/>
      )}
    </div>
  )
}







export default App