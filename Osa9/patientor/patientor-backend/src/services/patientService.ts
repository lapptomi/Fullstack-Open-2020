import patientsData from '../../data/patients';
import { Patient, NewPatient, PublicPatient } from '../types';

const patients = [...patientsData];

const getPatients = (): Patient[] => {
  return patients;
};

const idGen = (len: number) => {
  let id = '';
  const charset = "abcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < len; i++) {
    id += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return id;
};

const addPatient = (patientToAdd: NewPatient): Patient => {
  const randomID = (
    `${idGen(8)}-${idGen(4)}-${idGen(4)}-${idGen(4)}-${idGen(12)}`
  );
  
  const newPatient = {
    id: randomID,
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