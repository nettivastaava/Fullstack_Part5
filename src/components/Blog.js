import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'


const Blog = ({ blog, user, giveLike, blogs, setBlogs }) => {
  const [blogVisible, setBlogVisible] = useState(false)

  const hideWhenVisible = { display: blogVisible ? 'none' : '' }
  const showWhenVisible = { display: blogVisible ? '' : 'none' }

  const deleteBlog = () => {

    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) { 
      blogService.deleteBlog(blog.id)
        .then(() => {
          setBlogs(blogs.filter(b => b.id !== blog.id))
        })
    }
  }
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return(
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author} <button onClick={() => setBlogVisible(true)}>view</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} {blog.author}  <button onClick={() => setBlogVisible(false)}>hide</button>
        <br/>
        {blog.url}
        <br/>
        {blog.likes} <button onClick={() => giveLike(blog)}>like</button>
        <br/>
        {blog.user.name}
        <br/>
        {blog.user.username===user.username && <button onClick={() => deleteBlog()}>delete</button>}
        <br/>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  giveLike: PropTypes.func.isRequired,
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired
}

export default Blog
