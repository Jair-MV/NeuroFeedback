export const state = {
    patients: [],
    patientsPerPage: 9,
    currentPage: 0,
};

export function getTotalPages() {
    return Math.ceil(state.patients.length / state.patientsPerPage) - 1;
}
