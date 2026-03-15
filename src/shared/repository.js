const API_URL = "http://localhost:8001/v1/patients";

export async function loadPatients() {
    const response = await fetch(`${API_URL}/getAll`);

    if (!response.ok) {
        throw new Error("Error loading patients");
    }

    return await response.json();
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

export async function findByPatientId(patientId) {
    const response = await fetch(`${API_URL}/get/${patientId}`);

    if (!response.ok) {
        throw new Error("Error loading patient");
    }

    return await response.json();
}
