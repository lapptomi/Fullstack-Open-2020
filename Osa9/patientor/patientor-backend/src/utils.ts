/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatient, Gender } from './types';

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

const parseDateOfBirth = (dateOfBirth: any): string => {
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

const toNewPatient = (object: NewPatient): NewPatient => {
  return {
    name: parseName(object.name),
    ssn: parseSSN(object.ssn),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    occupation: parseOccupation(object.occupation),
    gender: parseGender(object.gender),
    entries: []
  };
};

export default toNewPatient;

