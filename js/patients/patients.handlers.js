import {
    paginationEl,
    pageNumbersEl,
    patientsListEl,
    overlayEl,
} from "./patients.dom.js";

import { state, getTotalPages } from "./patients.state.js";
import { getPatients, loadPatient } from "./patients.api.js";
import {
    renderPatients,
    renderPaginationPageNumbers,
    patientDetailsModal,
} from "./patients.ui.js";
import { randomNumber } from "../shared/utils.js";

export function handlePaginationButtonsClick(e) {
    const button = e.target.closest("button");

    if (!button) return;

    const currentPage = state.currentPage;
    const firstPage = 0;
    const lastPage = getTotalPages();

    let render = true;

    if (button.id === "buttonBackwards" && currentPage !== firstPage) {
        state.currentPage--;
    } else if (button.id === "buttonForwards" && currentPage !== lastPage) {
        state.currentPage++;
    } else {
        render = false;
    }

    if (!render) return;

    const patients = getPatients(state.currentPage);
    renderPatients(patientsListEl, patients, randomNumber);
    renderPaginationPageNumbers(pageNumbersEl, getTotalPages());
}

export function bindOverlayEvents(overlay) {
    const closeBtn = overlay.querySelector(".patient-card__close");

    closeBtn.addEventListener("click", closeExtendedPatientCard);
}

export function closeExtendedPatientCard() {
    const overlay = document.querySelector(".patient-overlay");
    const card = overlay.querySelector(".patient-card--extended");

    if (!card) return;

    // 1. Disparar ambas animaciones al mismo tiempo
    card.dataset.state = "closed";
    overlay.dataset.state = "closed";

    // 2. Esperar a que termine la animación MÁS LENTA
    card.addEventListener(
        "transitionend",
        () => {
            overlay.innerHTML = "";
        },
        { once: true },
    );
}

export function bindEvents() {
    paginationEl.addEventListener("click", handlePaginationButtonsClick);

    pageNumbersEl.addEventListener("click", function (e) {
        const pageNumber = e.target.closest(".pagination__page-number");

        if (!pageNumber) return;

        // Go to selected page
        const page = Number(pageNumber.dataset.pageNumber);

        if (page === state.currentPage) return;

        state.currentPage = page;

        const patients = getPatients(page);
        renderPatients(patientsListEl, patients, randomNumber);
        renderPaginationPageNumbers(pageNumbersEl, getTotalPages());
    });

    // Show / Hide modal
    patientsListEl.addEventListener("click", function (e) {
        const detailsButton = e.target.closest('[data-action="details"]');

        if (!detailsButton) return;

        // Load patient data
        const patientID =
            detailsButton.closest(".patient-card").dataset.patientId;
        const patient = loadPatient(patientID);

        // Render patient card
        patientDetailsModal("open", patient);
    });

    overlayEl.addEventListener("click", function (e) {
        if (!e.target.classList.contains("patient-overlay")) return;

        patientDetailsModal("close");
    });

    document.addEventListener("keydown", function (e) {
        if (e.code !== "Escape") return;

        patientDetailsModal("close");
    });
}
