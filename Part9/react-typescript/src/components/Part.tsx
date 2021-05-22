import React from 'react';
import { CoursePart } from '../index';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
  switch (part.name) {
    case 'Fundamentals':
      return (
        <div>
          {part.name}&nbsp;
          {part.description}&nbsp;
          {part.exerciseCount}
        </div>
      );
    case 'Using props to pass data':
      return (
        <div>
          {part.name}&nbsp;
          {part.groupProjectCount}&nbsp;
          {part.exerciseCount} 
        </div>
      );
    case 'Deeper type usage':
      return (
        <div>
          {part.name}&nbsp;
          {part.description}&nbsp;
          {part.exerciseCount}&nbsp;
          {part.exerciseSubmissionLink}
        </div>
      );
    case 'Random course part':
      return (
        <div>
          {part.name}&nbsp;
          {part.description}&nbsp;
          {part.exerciseCount}&nbsp;
          {part.difficulty}
        </div>
      );
    default:
      return assertNever(part);
  }
};

export default Part;