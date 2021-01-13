import React from "react";
import axios from "axios";
import { Container, Icon } from "semantic-ui-react";
import { Patient, Entry, Diagnosis } from "../types";
import { apiBaseUrl } from "../constants";
import { addFetchedPatient, setDiagnosisList, useStateValue } from "../state";
import { useParams } from 'react-router-dom';


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

const DiagnosisInfo: React.FC<{ code: string }> = ({ code }) => {
  const [{ diagnoses }, ] = useStateValue();
  const diagnosis = diagnoses.find(d => d.code === code);
  return (
    <li>
      {diagnosis?.code} {diagnosis?.name}
    </li>
  );
};

const EntryInfo: React.FC<{ entry: Entry }> = ({ entry }) => {
  return (
    <div>
      <p>{entry.date} {entry.description}</p>
      <ul>
        {entry.diagnosisCodes?.map((code, i) => 
          <DiagnosisInfo code={code} key={i} />
        )}
      </ul>
    </div>
  );
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
          {patient.entries.map((entry, i) => 
            <EntryInfo entry={entry} key={i} />
          )}
      </Container>
    </div>
  );
};

export default PatientInfoPage;
