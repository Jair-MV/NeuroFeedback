import * as handlers from "./details.handlers.js";
import * as state from "../../app/appState.js";
import * as repository from "./details.repository.js";
import * as ui from "./details.ui.js";
import { randomNumber } from "../../shared/utils.js";
import { on } from "../../shared/eventBus.js";

const patientsListEl = document.querySelector(".patients-list");
const overlayEl = document.querySelector(".patient-overlay");
const searchResultsEl = document.querySelector(".search-results");
const pageNumbersEl = document.querySelector(".pagination__page-numbers");

export async function initDetails() {
    patientsListEl.addEventListener("click", function (e) {
        handlers.handleDetails({
            e,
            repository,
            ui,
            state,
            pageNumbersEl,
            randomNumber,
        });
    });

    overlayEl.addEventListener("click", function (e) {
        if (!e.target.classList.contains("patient-overlay")) return;

        ui.closePatientDetails();
    });

    document.addEventListener("keydown", function (e) {
        if (e.code !== "Escape") return;

        ui.closePatientDetails();
        ui.closeSearchResults(searchResultsEl);
    });

    on("searchResultClick", ({ selectedPatient }) => {
        ui.openPatientDetails(selectedPatient, {
            onClose: () => handlers.handleCloseModal(ui),
            onDelete: handlers.handleDeletePatient,
        });
    });
}
