import React from 'react'

interface Part {
  name: string;
  exerciseCount: number;
}

interface PartsProp {
  parts: Part[];
}

const Part: React.FC<{ part: Part }> = ({ part }) => {
  return <p>{part.name} {part.exerciseCount}</p>
}

const Content: React.FC<PartsProp> = ({ parts }) => {
  return (
    <div>
      {parts.map((part, i) => 
        <Part part={part} key={i} />
      )}
    </div>
  )
}

export default Content