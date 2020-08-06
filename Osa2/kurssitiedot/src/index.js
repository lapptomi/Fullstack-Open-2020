import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({courseName}) => {
  return <h2>{courseName}</h2>
}

const Part = ({name, exercises}) => {
  return <p>{name} {exercises}</p>
}

const Content = ({parts}) => {
  return (
    <>
      {parts.map((part, key) => 
        <Part 
          name={part.name} 
          exercises={part.exercises} 
          key={key} 
        />
      )}
    </>  
  )
}

const Course = ({course}) => {
  const total = course.parts.reduce((s, p) => s+p.exercises, 0)
  return (
    <>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <b>total of {total} exercises</b>
    </>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map((course, key) => 
        <Course course={course} key={key} />
      )}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))