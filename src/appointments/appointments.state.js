export const state = {
    patient: {},
    dates: [],
};

export function getPatient() {
    return state.patient;
}

export function setPatient(patient) {
    state.patient = patient;
}

export function setDate(date) {
    state.dates.push(date);
}

export function getDates() {
    return state.dates;
}

export function setDatesArr(datesArr) {
    state.dates = datesArr;
}
