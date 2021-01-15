import express from 'express';
import patientService from '../services/patientService';
import entryService from '../services/entryService';
import { NewPatient, NewEntry } from '../types';
import { toNewPatient, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(patientService.getNonSensitivePatients());
});

router.post('/', (req, res) => {
  try {
    const newPatient: NewPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (e) {
    res.status(400).send((e as Error).message);
  }
});

router.get('/:id', (req, res) => {
  const id: string = req.params.id;
  const patient = patientService.findPatientById(id);
  if (!patient) {
    return res.status(404).send({ error: 'Patient not found' });
  }
  return res.json(patient);
});

router.post('/:id/entries', (req, res) => {
  try {
    const id = req.params.id;
    const newEntry: NewEntry | undefined = toNewEntry(req.body);
    const addedEntry = entryService.addEntry(newEntry, id);
    res.json(addedEntry);
  } catch (e) {
    res.status(400).send((e as Error).message);
  }
});

export default router;