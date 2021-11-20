import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({
  createBlog,
  setCreateBlogVisible
}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      author: author,
      title: title,
      url: url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            id = 'title'
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author:
          <input
            id = 'author'
            value={author}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url:
          <input
            id = 'url'
            value={url}
            onChange={handleUrlChange}
          />
        </div>
        <div>
          <button id ='create-blog-button' type="submit" onClick={() => setCreateBlogVisible(false)}>create</button>
        </div>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
  setCreateBlogVisible: PropTypes.func.isRequired
}

export default BlogForm