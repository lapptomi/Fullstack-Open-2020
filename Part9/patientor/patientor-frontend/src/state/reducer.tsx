import { State } from "./state";
import { Diagnosis, Patient } from "../types";


export const setPatientList = (patients: Patient[]): Action => {
  return { 
    type: "SET_PATIENT_LIST", 
    payload: patients,
  };
};

export const setDiagnosisList = (diagnoses: Diagnosis[]): Action => {
  return { 
    type: "SET_DIAGNOSIS_LIST", 
    payload: diagnoses,
  };
};

export const addPatient = (newPatient: Patient): Action => {
  return { 
    type: "ADD_PATIENT", 
    payload: newPatient 
  };
};

export const addFetchedPatient = (patient: Patient): Action => {
  return { 
    type: "ADD_FETCHED_PATIENT", 
    payload: patient 
  };
};

export type Action =
    {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "SET_DIAGNOSIS_LIST";
      payload: Diagnosis[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "ADD_FETCHED_PATIENT";
      payload: Patient;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_FETCHED_PATIENT":
      return {
        ...state,
        fetchedPatients: {
          ...state.fetchedPatients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnoses: [...action.payload]
      };
    default:
      return state;
  }
};