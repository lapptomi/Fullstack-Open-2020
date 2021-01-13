import React from 'react';
import { Icon, Table } from 'semantic-ui-react';
import { OccupationalHealthcareEntry as Entry } from '../types';

const OccupationalHealthcareEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  return (
    <>
      <Table.Cell>
        {entry.date} 
        <Icon name="stethoscope" />
        {entry.employerName}
      </Table.Cell>
      <Table.Cell>{entry.description}</Table.Cell>
    </>
  );
};

export default OccupationalHealthcareEntry; 