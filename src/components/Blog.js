import React, { useState } from 'react'

const Blog = ({ blog, updateLikes }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visibility, setVisibility] = useState(false)


  const hideWhenVisible = { display: visibility ? 'none' : '' }
  const showWhenVisible = { display: visibility ? '' : 'none' }
  return (
    <div style={blogStyle}>
      <div>
        <div style={hideWhenVisible} className='hiddenView'>
          {blog.title} {blog.author}
          <button id='view-blog-button' onClick={() => setVisibility(true)}>view</button>
        </div>
        <div style={showWhenVisible} className='shownView'>
          {blog.title} {blog.author}
          <button onClick={() => setVisibility(false)}>hide</button>
          <br></br>{blog.url}
          <br></br>likes {blog.likes}
          <button onClick={updateLikes}>like</button>
          <br></br>{blog.user.name}
        </div>
      </div>
    </div>
  )
}

export default Blog