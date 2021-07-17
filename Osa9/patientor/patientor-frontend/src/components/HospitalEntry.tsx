import React from 'react';
import { HospitalEntry as Entry } from '../types';
import { Table } from 'semantic-ui-react';

const HospitalEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  return (
    <>
      <Table.Cell>{entry.date}</Table.Cell>
      <Table.Cell>{entry.description}</Table.Cell>
    </>
  );
};

export default HospitalEntry;