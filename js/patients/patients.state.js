export const state = {
    patients: [],
    patientsPerPage: 9,
    currentPage: 0,
};

export function getTotalPages() {
    return Math.ceil(state.patients.length / state.patientsPerPage) - 1;
}

export function getAllPatients() {
    return state.patients;
}

export function getPatientsPerPage() {
    return state.patientsPerPage;
}

export function getCurrentPage() {
    return state.currentPage;
}

export function setPatients(patients) {
    state.patients = patients;
}

export function setCurrentPage(page) {
    state.currentPage = page;
}

export function addPatient(patient) {
    state.patients.push(patient);
}

export function updatePatient(patient) {
    const index = state.patients.findIndex((p) => p.id === patient.id);
    state.patients[index] = patient;
}

export function deletePatient(id) {
    state.patients = state.patients.filter((p) => p.id !== id);
}

export function goForward() {
    state.currentPage++;
}

export function goBackward() {
    state.currentPage--;
}
