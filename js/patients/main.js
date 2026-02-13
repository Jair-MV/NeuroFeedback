import { loadPatients, getPatients } from "./patients.api.js";
import { patientsListEl, pageNumbersEl } from "./patients.dom.js";
import { bindEvents } from "./patients.handlers.js";
import { state, getTotalPages } from "./patients.state.js";
import { renderPatients, renderPaginationPageNumbers } from "./patients.ui.js";
import { randomNumber } from "../shared/utils.js";

const DATA_URL = "../patients-data.json";

async function init() {
    await loadPatients();

    const patients = getPatients(state.currentPage);

    renderPatients(patientsListEl, patients, randomNumber);
    renderPaginationPageNumbers(pageNumbersEl, getTotalPages());

    bindEvents();
}

init();
