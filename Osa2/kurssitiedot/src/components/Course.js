import React from 'react'


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

export default Course