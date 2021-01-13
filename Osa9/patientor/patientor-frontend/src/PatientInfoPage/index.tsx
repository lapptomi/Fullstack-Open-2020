import React from "react";
import axios from "axios";
import { Container, Icon, Table } from "semantic-ui-react";
import { Patient, Entry, Diagnosis } from "../types";
import { apiBaseUrl } from "../constants";
import { addFetchedPatient, setDiagnosisList, useStateValue } from "../state";
import { useParams } from 'react-router-dom';
import HospitalEntry from '../components/HospitalEntry';
import OccupationalHealthcareEntry from '../components/OccupationalHealthcare';
import HealthCheckEntry from '../components/HealthCheckEntry';


const genderIcon = (gender: string) => {
  switch (gender) {
    case "female":
      return <Icon name="venus" />;
    case "male": 
      return <Icon name="mars" />;
    default:
      return <Icon name="neuter" />;
  }
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch(entry.type) {
    case "Hospital":
      return <HospitalEntry entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntry entry={entry} />;
    case "HealthCheck":
      return <HealthCheckEntry entry={entry} />;
    default:
      return assertNever(entry);
  }
};

const PatientInfoPage: React.FC = () => {
  const [state, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    // return if patient is already fetched
    if (state.fetchedPatients[id]) {
      return;
    }
    const fetchPatient = async () => {
      try {
        const response = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(addFetchedPatient(response.data));
      } catch(e) {
        console.error(e);
      }
    };
    const fetchDiagnoses = async () => {
      try {
        const response = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnosis`
        );
        dispatch(setDiagnosisList(response.data));
      } catch(e) {
        console.error(e);
      }
    };
    fetchPatient();
    fetchDiagnoses();
  }, [id, dispatch, state.fetchedPatients]);
  
  const patient = state.fetchedPatients[id];

  if (!patient) {
    return <h2>Patient not found</h2>;
  }
  return (
    <div className="App">
      <Container>
        <h2>{patient.name} {genderIcon(patient.gender)}</h2>
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
        <strong>entries</strong>
      </Container>
      <Table celled>
        <Table.Body>
          {patient.entries.map((entry, i) => (
            <Table.Row key={i}>
              <EntryDetails entry={entry} key={i}/>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default PatientInfoPage;
