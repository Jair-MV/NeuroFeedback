import * as state from "./patients.state.js";
import * as api from "./patients.api.js";
import * as ui from "./patients.ui.js";
import * as service from "./patients.service.js";
import * as utils from "../shared/utils.js";

const patientsListEl = document.querySelector(".patients-list");
const paginationEl = document.querySelector(".pagination");
const pageNumbersEl = document.querySelector(".pagination__page-numbers");
const overlayEl = document.querySelector(".patient-overlay");
const searchFormInputEl = document.querySelector(".search-form__input");
const searchResultsEl = document.querySelector(".search-results");

function handlePaginationButtonsClick(e) {
    const button = e.target.closest("button");

    if (!button) return;

    const currentPage = state.getCurrentPage();
    const firstPage = 0;
    const lastPage = state.getTotalPages();

    let render = true;

    if (button.id === "buttonBackwards" && currentPage !== firstPage)
        state.goBackward();
    else if (button.id === "buttonForwards" && currentPage !== lastPage)
        state.goForward();
    else render = false;

    if (!render) return;

    const patients = service.getPatients(
        state.getAllPatients(),
        state.getCurrentPage(),
        state.getPatientsPerPage(),
    );
    ui.renderPatients(patientsListEl, patients, utils.randomNumber);
    ui.renderPaginationPageNumbers(
        pageNumbersEl,
        state.getTotalPages(),
        state.getCurrentPage(),
    );
}

function handleCloseModal() {
    ui.closePatientDetails();
}

function handleDeletePatient(e) {
    const patientId = Number(
        e.target.closest(".patient-card--extended").dataset.patientId,
    );

    api.deletePatient(patientId);
    state.deletePatient(patientId);

    handleCloseModal();

    const patients = service.getPatients(
        state.getAllPatients(),
        state.getCurrentPage(),
        state.getPatientsPerPage(),
    );

    ui.renderPatients(patientsListEl, patients, utils.randomNumber);
    ui.renderPaginationPageNumbers(
        pageNumbersEl,
        state.getTotalPages(),
        state.getCurrentPage(),
    );
}

function debounce(fn, delay) {
    let timeoutId;

    return function (...args) {
        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}

let controller;

async function fetchPatientByName(name) {
    if (controller) {
        controller.abort();
    }

    controller = new AbortController();

    try {
        const data = await api.searchByName(name, controller);

        return data;
    } catch (err) {
        if (err.name === "AbortError") {
            // request cancelado
            console.log("Peticion cancelada");
        } else {
            console.error(err);
        }
    }
}

const handleSearchInput = debounce(async (e) => {
    if (e.target.value.length < 2) {
        ui.closeSearchResults(searchResultsEl);
        return;
    }

    const patients = await fetchPatientByName(e.target.value);

    if (!patients.length) return;

    ui.renderSearchResultsRows(searchResultsEl, patients);
    ui.openSearchResults(searchResultsEl);
}, 300);

function bindEvents() {
    paginationEl.addEventListener("click", handlePaginationButtonsClick);

    pageNumbersEl.addEventListener("click", function (e) {
        const pageNumber = e.target.closest(".pagination__page-number");

        if (!pageNumber) return;

        // Go to selected page
        const page = Number(pageNumber.dataset.pageNumber);

        if (page === state.getCurrentPage()) return;

        state.setCurrentPage(page);

        const patients = service.getPatients(
            state.getAllPatients(),
            page,
            state.getPatientsPerPage(),
        );
        ui.renderPatients(patientsListEl, patients, utils.randomNumber);

        ui.renderPaginationPageNumbers(
            pageNumbersEl,
            state.getTotalPages(),
            state.getCurrentPage(),
        );
    });

    searchFormInputEl.addEventListener("input", function (e) {
        handleSearchInput(e);
    });

    // Show / Hide modal
    patientsListEl.addEventListener("click", async function (e) {
        const detailsButton = e.target.closest('[data-action="details"]');

        if (!detailsButton) return;

        // Load patient data
        const patientID =
            detailsButton.closest(".patient-card").dataset.patientId;
        const patient = await api.loadPatient(patientID);

        // Render patient card
        const enrichedPatient = {
            ...patient,
            showTutor: service.isAdult(patient.age),
        };

        ui.openPatientDetails(enrichedPatient, {
            onClose: handleCloseModal,
            onDelete: handleDeletePatient,
        });
    });

    overlayEl.addEventListener("click", function (e) {
        if (!e.target.classList.contains("patient-overlay")) return;

        ui.closePatientDetails();
    });

    document.addEventListener("keydown", function (e) {
        if (e.code !== "Escape") return;

        ui.closePatientDetails();
    });
}

export async function init() {
    const patients = await api.loadPatients();
    state.setPatients(patients);

    const pagePatients = service.getPatients(
        patients,
        state.getCurrentPage(),
        state.getPatientsPerPage(),
    );

    ui.renderPatients(patientsListEl, pagePatients, utils.randomNumber);
    ui.renderPaginationPageNumbers(
        pageNumbersEl,
        state.getTotalPages(),
        state.getCurrentPage(),
    );

    bindEvents();
}
