import patients from '../../data/patients.json';
import { Patient, PatientsWithoutSSN } from '../types';

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): PatientsWithoutSSN[] => {
  return patients.map((
    { id, name, dateOfBirth, gender, occupation }) => ({
      id, name, dateOfBirth, gender, occupation
    }));
};

export default { 
  getPatients, 
  getNonSensitivePatients 
};