const API_URL = "http://localhost:8001/v1/patients";

export async function loadPatients() {
    const response = await fetch(`${API_URL}/getAll`);

    if (!response.ok) {
        throw new Error("Error loading patients");
    }

    return await response.json();
}
