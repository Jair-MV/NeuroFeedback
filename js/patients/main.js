import { loadPatients } from "./patients.api.js";
import { patientsListEl, pageNumbersEl } from "./patients.dom.js";
import { bindEvents } from "./patients.handlers.js";
import { state, getTotalPages } from "./patients.state.js";
import { renderPatients, renderPaginationPageNumbers } from "./patients.ui.js";
import { randomNumber } from "../shared/utils.js";

import { setPatients } from "./patients.state.js";
import { getPatients } from "./patients.service.js";

async function init() {
    const patients = await loadPatients();
    setPatients(patients);

    const pagePatients = getPatients(
        patients,
        state.currentPage,
        state.patientsPerPage,
    );

    renderPatients(patientsListEl, pagePatients, randomNumber);
    renderPaginationPageNumbers(pageNumbersEl, getTotalPages());

    bindEvents();
}

init();
