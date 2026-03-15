import * as handlers from "./list.handlers.js";
import * as state from "../../app/appState.js";
import * as ui from "./list.ui.js";
import * as utils from "../../shared/utils.js";
import { on } from "../../shared/eventBus.js";
import { getPatients } from "../../shared/service.js";

const patientsListEl = document.querySelector(".patients-list");
const paginationEl = document.querySelector(".pagination");
const pageNumbersEl = document.querySelector(".pagination__page-numbers");

export async function init() {
    const pagePatients = getPatients(
        state.getAllPatients(),
        state.getCurrentPage(),
        state.getPatientsPerPage(),
    );

    ui.renderPatients(patientsListEl, pagePatients, utils.randomNumber);
    ui.renderPaginationPageNumbers(
        pageNumbersEl,
        state.getTotalPages(),
        state.getCurrentPage(),
    );

    paginationEl.addEventListener("click", (e) => {
        handlers.handlePaginationButtonsClick({
            e,
            state,
            ui,
            patientsListEl,
            pageNumbersEl,
            randomNumber: utils.randomNumber,
        });
    });

    pageNumbersEl.addEventListener("click", function (e) {
        handlers.handlePageNumberClick({
            e,
            state,
            ui,
            patientsListEl,
            pageNumbersEl,
            randomNumber: utils.randomNumber,
        });
    });

    on("patientDeleted", () => {
        const patients = getPatients(
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
    });

    on("searchResultClick", () => {
        ui.renderPatients(
            patientsListEl,
            state.getAllPatients(),
            utils.randomNumber,
        );
        ui.renderPaginationPageNumbers(
            pageNumbersEl,
            state.getTotalPages(),
            state.getCurrentPage(),
        );
    });

    on("searchFormSubmit", () => {
        ui.renderPatients(
            patientsListEl,
            state.getAllPatients(),
            utils.randomNumber,
        );
        ui.renderPaginationPageNumbers(
            pageNumbersEl,
            state.getTotalPages(),
            state.getCurrentPage(),
        );
    });
}
