import patientsData from '../../data/patients.json';
import { Patient, PatientsWithoutSSN, NewPatient } from '../types';

const patients: Patient[] = patientsData;

const getPatients = (): Patient[] => {
  return patients;
};

const addPatient = (patientToAdd: NewPatient): Patient => {
  const randomNumber = String(Math.floor(Math.random() * 999999));
  const randomId = "d2773598-f723-11e9-8f0b-362b9e"+randomNumber;
  
  const newPatient = {
    id: randomId,
    ...patientToAdd
  };
  
  patients.push(newPatient);
  return newPatient;
};

const getNonSensitivePatients = (): PatientsWithoutSSN[] => {
  return patients.map((
    { id, name, dateOfBirth, gender, occupation }) => ({
      id, name, dateOfBirth, gender, occupation
    }));
};

export default { 
  getPatients, 
  addPatient,
  getNonSensitivePatients
};