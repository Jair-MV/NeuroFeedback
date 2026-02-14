export function getPatients(patients, page, perPage) {
    const startIndex = page * perPage;
    const endIndex = startIndex + perPage;

    return patients.slice(startIndex, endIndex);
}

export function isAdult(age) {
    return age >= 18;
}
