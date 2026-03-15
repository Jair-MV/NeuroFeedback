const API_URL = "http://localhost:8001/v1/patients";

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
