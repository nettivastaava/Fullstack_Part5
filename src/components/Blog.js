import React, { useState} from 'react'
import blogService from '../services/blogs'


const Blog = ({ blog, giveLike }) => {
  const [blogVisible, setBlogVisible] = useState(false)

  const hideWhenVisible = { display: blogVisible ? 'none' : '' }
  const showWhenVisible = { display: blogVisible ? '' : 'none' }


  
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
      </div>
    </div>
  )
}

export default Blog
