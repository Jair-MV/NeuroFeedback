export function getURLPatientId() {
    const params = new URLSearchParams(window.location.search);
    return params.get("patientId");
}

export function isAdult(age) {
    return age >= 18;
}

export function getPatients(patients, page, perPage) {
    const startIndex = page * perPage;
    const endIndex = startIndex + perPage;

    return patients.slice(startIndex, endIndex);
}
