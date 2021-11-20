import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  //user
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  //notification
  const [notification, setNotification] = useState(null)
  // visibility
  const [createBlogVisible, setCreateBlogVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
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

  const notifyWith = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

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
      notifyWith('wrong username or password', 'error')
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    notifyWith('logout succesful. Refresh page')
  }

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        notifyWith(` ${returnedBlog.title} by ${returnedBlog.author} added`)
      })
  }

  const updateBlogLikes = id => {
    const blog = blogs.find(b => b.id === id)
    const changedBlog = { ...blog, user: blog.user.id, likes: blog.likes + 1 }

    blogService
      .update(id, changedBlog)
      .then(() => {
        const updatedBlog = { ...blog, likes: blog.likes + 1 } // jotta blog.user.name ei katoa blogin listauksen tiedoista..
        setBlogs(blogs.map(blog => blog.id !== id ? blog : updatedBlog))
        notifyWith(`updating likes for blog called  ${updatedBlog.title} succeeded`)
      })
      .catch(() => {
        notifyWith('updating likes failed', 'error')
      })
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification notification={notification} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id='username'
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id='password'
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="login-button" type="submit">login</button>
        </form>
      </div>
    )
  }

  const hideWhenVisible = { display: createBlogVisible ? 'none' : '' }
  const showWhenVisible = { display: createBlogVisible ? '' : 'none' }

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      {user.name} logged in
      <button onClick={handleLogout} >logout</button>
      <p></p>
      <div style={hideWhenVisible}>
        <button id="open-blog-menu-button" onClick={() => setCreateBlogVisible(true)}>create blog</button>
      </div>
      <div style={showWhenVisible}>
        <BlogForm createBlog={addBlog} setCreateBlogVisible={setCreateBlogVisible} />
        <button onClick={() => setCreateBlogVisible(false)}>cancel</button>
      </div>
      {blogs
        .sort((firstItem, secondItem) => secondItem.likes - firstItem.likes)
        .map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            updateLikes={() => updateBlogLikes(blog.id)}
          />)
      }
    </div >
  )


}

export default App