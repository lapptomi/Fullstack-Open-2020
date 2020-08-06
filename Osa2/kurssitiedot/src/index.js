import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({courseName}) => {
  return <h1>{courseName}</h1>
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
  return (
    <>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
    </>
  )
}

const App = () => {
  const course = {
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
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))