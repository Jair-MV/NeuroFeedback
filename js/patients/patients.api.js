import { state } from "./patients.state.js";

export async function loadPatients(url) {
    const response = await fetch(url);
    const patients = await response.json();
    state.patients = patients;
}

export function loadPatient(id) {
    return state.patients.find((p) => p.id === id);
}

export function getPatients(page) {
    const startIndex = page * state.patientsPerPage;
    const endIndex = startIndex + state.patientsPerPage;

    return state.patients.slice(startIndex, endIndex);
}
