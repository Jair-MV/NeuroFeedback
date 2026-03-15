import * as handlers from "./appointments.handlers.js";
import { getURLPatientId } from "../shared/service.js";
import { on } from "../shared/eventBus.js";

import * as globalState from "../app/appState.js";

export async function initCalendar() {
    const domLoadedPromise = new Promise((resolve) => {
        document.addEventListener("DOMContentLoaded", resolve);
    });

    await domLoadedPromise;

    const calendar = handlers.setGeneralSetUp();

    const patientId = getURLPatientId();

    if (patientId) handlers.setPatientSetUp({ patientId, calendar });
    else {
        const searchForm = document.querySelector(".search-form--calendar");
        searchForm.style.display = "flex";
        handlers.setOverviewSetUp(calendar);

        on("searchFormSubmit", () => {
            handlers.handleSearchFormSubmit({ globalState, calendar });
        });

        on("searchResultClick", ({ selectedPatient }) => {
            handlers.handleSearchResultClick(selectedPatient, calendar);
        });
    }
}
