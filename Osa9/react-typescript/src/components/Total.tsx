import React from 'react';
import { CoursePart } from '../index';

const Total: React.FC<{ parts: CoursePart[] }> = ({ parts }) => {
  const total = parts.reduce((carry, part) => 
    carry + part.exerciseCount, 0); 
  
  return <p>Number of exercises {total}</p>;
};

export default Total;