import React from "react";
import axios from "axios";
import { Container, Icon } from "semantic-ui-react";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
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
        dispatch({
          type: 'ADD_FETCHED_PATIENT', 
          payload: response.data 
        });
      } catch(e) {
        console.error(e);
      }
    };
    fetchPatient();
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
      </Container>
    </div>
  );
};

export default PatientInfoPage;
