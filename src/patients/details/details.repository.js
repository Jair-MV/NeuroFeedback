const API_URL = "http://localhost:8001/v1/patients";

export async function deletePatient(id) {
    const response = await fetch(`${API_URL}/delete/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Error deleting patient");
    }
}
