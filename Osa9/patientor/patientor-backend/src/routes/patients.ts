import express from 'express';
import patientService from '../services/patientService';
import { NewPatient } from '../types';
import toNewPatient from '../utils';

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

router.get("/:id", (req, res) => {
  const id: string = req.params.id;
  const patient = patientService.findPatientById(id);
  if (!patient) {
    return res.status(404).send({ error: 'Patient not found' });
  }
  return res.json(patient);
});

export default router;