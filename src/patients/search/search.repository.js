const API_URL = "http://localhost:8001/v1/patients";

export async function searchByName(name, controller) {
    const response = await fetch(`${API_URL}/findByName/${name}`, {
        signal: controller.signal,
    });

    if (!response.ok) {
        throw new Error("Error searching patient");
    }

    return await response.json();
}
