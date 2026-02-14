import { loadPatients, getPatients } from "./patients.api.js";
import { patientsListEl, pageNumbersEl } from "./patients.dom.js";
import { bindEvents } from "./patients.handlers.js";
import { state, getTotalPages } from "./patients.state.js";
import { renderPatients, renderPaginationPageNumbers } from "./patients.ui.js";
import { randomNumber } from "../shared/utils.js";
import { setPatients } from "./patients.state.js";

async function init() {
    const patients = await loadPatients();
    setPatients(patients);

    const pagePatients = getPatients(state.currentPage);

    renderPatients(patientsListEl, pagePatients, randomNumber);
    renderPaginationPageNumbers(pageNumbersEl, getTotalPages());

    bindEvents();
}

init();
