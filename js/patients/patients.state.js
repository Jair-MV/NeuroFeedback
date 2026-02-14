export const state = {
    patients: [],
    patientsPerPage: 9,
    currentPage: 0,
};

export function getTotalPages() {
    return Math.ceil(state.patients.length / state.patientsPerPage) - 1;
}

export function setPatients(patients) {
    state.patients = patients;
}

export function addPatient(patient) {
    state.patients.push(patient);
}

export function updatePatient(patient) {
    const index = state.patients.findIndex((p) => p.id === patient.id);
    state.patients[index] = patient;
}
