import { emit } from "../../shared/eventBus.js";

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

async function fetchPatientByName(name, repository) {
    if (controller) {
        controller.abort();
    }

    controller = new AbortController();

    try {
        const data = await repository.searchByName(name, controller);

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

let searchedPatients = [];

export const handleSearchInput = debounce(
    async ({ e, ui, searchResultsEl, repository }) => {
        if (e.target.value.length < 2) {
            ui.closeSearchResults(searchResultsEl);
            return;
        }

        searchedPatients = await fetchPatientByName(e.target.value, repository);

        if (!searchedPatients.length) return;

        ui.openSearchResults(searchResultsEl);
        ui.renderSearchResultsRows(searchResultsEl, searchedPatients);
    },
    300,
);

// handleSearchForm and handleSearchResultClick can only execute after searchedPatients is set by handleSearchInput
export async function handleSearchFormSubmit({
    e,
    state,
    ui,
    searchResultsEl,
}) {
    e.preventDefault();

    if (!searchedPatients.length) return;

    state.setPatients(searchedPatients);

    emit("searchFormSubmit", {});

    ui.closeSearchResults(searchResultsEl);
}

export async function handleSearchResultClick({
    e,
    state,
    ui,
    randomNumber,
    searchResultsEl,
}) {
    const row = e.target.closest(".search-results__row");
    if (!row) return;

    state.setPatients(searchedPatients);

    const selectedPatient = searchedPatients.find(
        (p) => p.id === Number(row.dataset.patientId),
    );

    ui.closeSearchResults(searchResultsEl);

    emit("searchResultClick", { searchResultsEl, selectedPatient });
}
