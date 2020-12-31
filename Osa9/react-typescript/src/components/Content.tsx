import React from 'react';
import Part from './Part';
import { CoursePart } from '../index';

const Content: React.FC<{ parts: CoursePart[] }> = ({ parts }) => {
  return (
    <div>
      {parts.map((part, i) => 
        <Part part={part} key={i} />
      )}
    </div>
  );
};

export default Content;