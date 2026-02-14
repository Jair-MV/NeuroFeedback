import { state } from "./patients.state.js";

const API_URL = "http://localhost:8001/v1/patients";

export async function loadPatients() {
    const response = await fetch(`${API_URL}/getAll`);

    if (!response.ok) {
        throw new Error("Error loading patients");
    }

    return await response.json();
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

    return await response.json();
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

    return await response.json();
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

// Dominio lógica
export function getPatients(page) {
    const startIndex = page * state.patientsPerPage;
    const endIndex = startIndex + state.patientsPerPage;

    return state.patients.slice(startIndex, endIndex);
}
