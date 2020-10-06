import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, getByText } from '@testing-library/react'
import Blog from './Blog'



test('Blog default state renders only author and title', () => {
  const blog = {
    title: 'TestTitle',
    author: 'TestAuthor',
    url: 'TestUrl',
    likes: 0
  }
  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent('TestTitle')
  expect(component.container).toHaveTextContent('TestAuthor')

  expect(component.container).not.toHaveTextContent('TestUrl')
  expect(component.container).not.toHaveTextContent('likes')
})