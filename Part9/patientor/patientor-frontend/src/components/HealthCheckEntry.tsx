import React from 'react';
import { Icon, Table } from 'semantic-ui-react';
import { HealthCheckEntry as Entry } from '../types';

const HealthCheckEntry: React.FC<{ entry: Entry }> = ({ entry }) => {

  const getHeartColor = () => {
    switch (entry.healthCheckRating) {
      case 1:
        return "yellow";
      case 2:
        return "orange";
      case 3:
        return "red";
      default:
        return "green";   
    }
  };

  return (
    <>
      <Table.Cell>
        {entry.date} <Icon name="user doctor"/>
      </Table.Cell>
      <Table.Cell>{entry.description}</Table.Cell>
      <Table.Cell> 
        <Icon 
          name="heart" 
          color={getHeartColor()} 
        /> 
      </Table.Cell>
    </>
  );
};

export default HealthCheckEntry;