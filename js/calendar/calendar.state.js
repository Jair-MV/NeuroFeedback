export const state = {
    patient: {},
};

export function getPatient() {
    return state.patient;
}

export function setPatient(patient) {
    state.patient = patient;
}
