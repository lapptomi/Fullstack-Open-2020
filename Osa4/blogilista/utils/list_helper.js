const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let likes = 0
  blogs.map(blog => likes+=blog.likes)
  return likes
}

const favoriteBlog = (blogs) => {
  const mostLikes = Math.max(...blogs.map(b => b.likes), 0)
  const blogWithMostLikes = blogs.find(blog => {
    return blog.likes === mostLikes
  })
  return blogWithMostLikes
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}