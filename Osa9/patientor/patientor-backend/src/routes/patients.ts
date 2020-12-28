import express from 'express';
import patientService from '../services/patientService';
import { NewPatient } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(patientService.getNonSensitivePatients());
});

router.post('/', (req, res) => {
  const { 
    name, ssn, dateOfBirth, occupation, gender 
  } = req.body as NewPatient;
  
  const newPatient = patientService.addPatient({
    name, ssn, dateOfBirth, occupation, gender
  }); 
  
  res.json(newPatient);
});

export default router;