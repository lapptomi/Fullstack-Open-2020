import patientsData from '../../data/patients';
import { Patient, NewPatient, PublicPatient } from '../types';

const patients = [...patientsData];

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

const findPatientById = (id: string): Patient | undefined => {
  const patient = patients.find(p => p.id === id);
  return patient;
};

const getNonSensitivePatients = (): PublicPatient[] => {
  return patients.map((
    { id, name, dateOfBirth, gender, occupation }) => ({
      id, name, dateOfBirth, gender, occupation
    }));
};

export default { 
  getPatients, 
  addPatient,
  findPatientById,
  getNonSensitivePatients
};