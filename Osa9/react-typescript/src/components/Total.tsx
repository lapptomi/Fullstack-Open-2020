import React from 'react'

interface Part {
  name: string;
  exerciseCount: number;
}

const Total: React.FC<{ parts: Part[] }> = ({ parts }) => {
  const total = parts.reduce((carry, part) => 
    carry + part.exerciseCount, 0)
  
  return <p>Number of exercises {total}</p>
}

export default Total