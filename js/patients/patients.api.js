import { state } from "./patients.state.js";

const API_URL = "http://localhost:8001/v1/patients";

export async function loadPatients() {
    const response = await fetch(`${API_URL}/getAll`);

    if (!response.ok) {
        throw new Error("Error loading patients");
    }

    const patients = await response.json();
    state.patients = patients;
}

export async function createPatient(patientData) {
    const response = await fetch(`${API_URL}/save`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(patientData),
    });

    if (!response.ok) {
        throw new Error("Error creating patient");
    }

    const createdPatient = await response.json();

    state.patients.push(createdPatient);

    return createdPatient;
}

export async function updatePatient(updatedPatient) {
    const response = await fetch(`${API_URL}/update`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPatient),
    });

    if (!response.ok) {
        throw new Error("Error updating patient");
    }

    const savedPatient = await response.json();

    const index = state.patients.findIndex((p) => p.id === savedPatient.id);

    if (index !== -1) {
        state.patients[index] = savedPatient;
    }

    return savedPatient;
}

export async function deletePatient(id) {
    const response = await fetch(`${API_URL}/delete/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Error deleting patient");
    }

    state.patients = state.patients.filter((p) => p.id !== id);
}

export async function loadPatient(id) {
    const response = await fetch(`${API_URL}/get/${id}`);

    if (!response.ok) {
        throw new Error("Network error");
    }

    const patient = await response.json();

    // Si el backend devuelve todo null cuando no existe
    const isEmpty = Object.values(patient).every((value) => value === null);

    if (isEmpty) {
        return null;
    }

    return patient;
}

export function getPatients(page) {
    const startIndex = page * state.patientsPerPage;
    const endIndex = startIndex + state.patientsPerPage;

    return state.patients.slice(startIndex, endIndex);
}
