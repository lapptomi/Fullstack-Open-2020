import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
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

test('clicking view button makes likes and url visible', () => {
  const blog = {
    title: 'TestTitle',
    author: 'TestAuthor',
    url: 'TestUrl',
    likes: 0
  }

  const component = render(
    <Blog blog={blog} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent('TestTitle')
  expect(component.container).toHaveTextContent('TestAuthor')
  expect(component.container).toHaveTextContent('TestUrl')
  expect(component.container).toHaveTextContent('likes ')
})

test ('clicking like button twice calls event handler twice', () => {
  const blog = {
    title: 'TestTitle',
    author: 'TestAuthor',
    url: 'TestUrl',
    likes: 0
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} handleLikeButtonClick={mockHandler} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  const likebutton = component.getByText('like')
  fireEvent.click(likebutton)
  fireEvent.click(likebutton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})