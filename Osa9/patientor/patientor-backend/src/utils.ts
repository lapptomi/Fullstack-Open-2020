/* eslint-disable @typescript-eslint/no-explicit-any */
import { 
  NewPatient, 
  Gender,
  NewEntry, 
  NewHospitalEntry,
  NewOccupationalHealthcareEntry,
  NewHealthCheckEntry,
  EntryType,
  HealthCheckRating
} from './types';

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name: ' + String(name));
  }
  return name;
};

const parseSSN = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn: ' + String(ssn));
  }
  return ssn;
};

const isDate = (date: any): string => {
  if (!date || !isString(date)) {
    throw new Error('Incorrect or missing date ' + String(date));
  }
  return date;
};

const parseDate = (dateOfBirth: any): string => {
  if (!dateOfBirth || !isString(dateOfBirth || !isDate(dateOfBirth))) {
    throw new Error('Incorrect or missing dateOfBirth: ' + String(dateOfBirth));
  }
  return String(dateOfBirth);
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation: ' + String(occupation));
  }
  return occupation;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + String(gender));
  }
  return gender;
};

export const toNewPatient = (object: NewPatient): NewPatient => {
  return {
    name: parseName(object.name),
    ssn: parseSSN(object.ssn),
    dateOfBirth: parseDate(object.dateOfBirth),
    occupation: parseOccupation(object.occupation),
    gender: parseGender(object.gender),
    entries: []
  };
};


const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const parseSpecialist = (specialist: any): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist: ' + String(specialist));
  }
  return specialist;
};

const parseDescription = (description: any): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description: ' + String(description));
  }
  return description;
};

const parseCriteria = (criteria: any): string => {
  if (!criteria || !isString(criteria)) {
    throw new Error('Incorrect or missing criteria: ' + String(criteria));
  }
  return criteria;
};

const parseEmployerName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name: ' + String(name));
  }
  return name;
};

const parseHealthRating = (rating: any): HealthCheckRating => {
  if (!rating || rating != HealthCheckRating || isNaN(rating)) {
    throw new Error('Incorrect or missing health rating: ' + String(rating));
  }
  return rating as HealthCheckRating;
};

const parseSickLeave = ({ startDate, endDate }: any) => {
  if (!startDate || !endDate) {
    return;
  }
  if (!isString(startDate) || !isString(endDate)) {
    throw new Error('Incorrect or missing end or startDate: ' + String(endDate));
  }
  return { startDate, endDate };
};

const parseDiagnosisCodes = (codes: any) => {
  if (!Object.values(codes).every(c => isString(c))) {
    throw new Error('Incorrect or missing diagnosis code values: ' + String(codes));
  }
  return codes as Array<string>;
};

const toNewHospitalEntry = (object: NewHospitalEntry): NewHospitalEntry => {
  const diagnosisCodes = object.diagnosisCodes 
    ? parseDiagnosisCodes(object.diagnosisCodes)
    : undefined;
  return {
    date: parseDate(object.date),
    type: EntryType.Hospital,
    specialist: parseSpecialist(object.specialist),
    diagnosisCodes: diagnosisCodes,
    description: parseDescription(object.description),
    discharge: {
      date: parseDate(object.discharge.date),
      criteria: parseCriteria(object.discharge.criteria)
    }
  };
};

const toNewOccupationalHealthcareEntry = (
  object: NewOccupationalHealthcareEntry
  ): NewOccupationalHealthcareEntry => {

  const sickLeave = object.sickLeave 
    ? parseSickLeave(object.sickLeave)
    : undefined;
  const diagnosisCodes = object.diagnosisCodes 
    ? parseDiagnosisCodes(object.diagnosisCodes)
    : undefined;
    
  return {
      date: parseDate(object.date),
      type: EntryType.OccupationalHealthcare,
      specialist: parseSpecialist(object.specialist),
      employerName: parseEmployerName(object.employerName),
      diagnosisCodes: diagnosisCodes,
      description: parseDescription(object.description),
      sickLeave: sickLeave
  };
};

const toNewHealthCheckEntry = (object: NewHealthCheckEntry): NewHealthCheckEntry => {
  return {
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    type: EntryType.HealthCheck,
    description: parseDescription(object.description),
    healthCheckRating: parseHealthRating(object.healthCheckRating),
  };
};

export const toNewEntry = (object: NewEntry): NewEntry => {
  const hospitalEntry = object as NewHospitalEntry;
  const healthcareEntry = object as NewOccupationalHealthcareEntry;
  const healthCheckEntry = object as NewHealthCheckEntry;

  switch (object.type) {
    case 'Hospital':
      return toNewHospitalEntry(hospitalEntry);
    case 'OccupationalHealthcare':
      return toNewOccupationalHealthcareEntry(healthcareEntry);
    case 'HealthCheck':
      return toNewHealthCheckEntry(healthCheckEntry);
    default:
      return assertNever(object.type);
  }
};

