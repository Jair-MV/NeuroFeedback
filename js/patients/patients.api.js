import { state } from "./patients.state.js";

const STORAGE_KEY = "patients_app";

function persist() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.patients));
}

function generateId() {
    return crypto.randomUUID();
}

export async function loadPatients(url) {
    const localData = localStorage.getItem(STORAGE_KEY);

    if (localData) {
        state.patients = JSON.parse(localData);
        return;
    }

    const response = await fetch(url);
    const patients = await response.json();

    state.patients = patients;
    persist();
}

export function loadPatient(id) {
    return state.patients.find((p) => p.id === id);
}

export function getPatients(page) {
    const startIndex = page * state.patientsPerPage;
    const endIndex = startIndex + state.patientsPerPage;

    return state.patients.slice(startIndex, endIndex);
}

export function createPatient(patientData) {
    const newPatient = {
        ...patientData,
        id: generateId(),
    };

    console.log(state.patients);
    state.patients.push(newPatient);
    console.log(state.patients);
    persist();
}

export function updatePatient(updatedPatient) {
    const index = state.patients.findIndex((p) => p.id === updatedPatient.id);

    if (!(index !== -1)) return;

    state.patients[index] = updatedPatient;
    persist();
}

export function deletePatient(id) {
    state.patients = state.patients.filter((p) => p.id !== id);
    persist();
}
