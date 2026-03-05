const API_URL = "http://localhost:8001/v1/dates/";

export async function saveDate(date) {
    const response = await fetch(`${API_URL}save`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(date),
    });

    if (!response.ok) {
        throw new Error("Error saving date");
    }

    return await response.json();
}

export async function getAllDates() {
    const response = await fetch(`${API_URL}getAll`);

    if (!response.ok) return;

    return await response.json();
}

export async function deleteDate(idDate) {
    const response = await fetch(`${API_URL}delete/${idDate}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Error deleting date");
    }
}
