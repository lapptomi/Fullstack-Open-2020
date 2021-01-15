import patientService from '../services/patientService';
import { Entry, NewEntry } from '../types';

const idGen = (len: number) => {
  let id = '';
  const charset = "abcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < len; i++) {
    id += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return id;
};

const addEntry = (entryToAdd: NewEntry, id: string): Entry => {
  const randomID = (
    `${idGen(8)}-${idGen(4)}-${idGen(4)}-${idGen(4)}-${idGen(12)}`
  );
  
  const newEntry = {
    id: randomID,
    ...entryToAdd
  } as Entry;
  
  const patient = patientService.findPatientById(id);
  if (patient) {
    patient.entries.push(newEntry);
  } else {
    throw new Error(`Patient with id: ${id} not found`);
  }

  return newEntry;
};

export default { 
  addEntry
};