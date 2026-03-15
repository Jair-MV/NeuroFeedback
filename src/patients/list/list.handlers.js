import { getPatients } from "../../shared/service.js";

export function handlePaginationButtonsClick({
    e,
    state,
    ui,
    patientsListEl,
    pageNumbersEl,
    randomNumber,
}) {
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

    const patients = getPatients(
        state.getAllPatients(),
        state.getCurrentPage(),
        state.getPatientsPerPage(),
    );
    ui.renderPatients(patientsListEl, patients, randomNumber);
    ui.renderPaginationPageNumbers(
        pageNumbersEl,
        state.getTotalPages(),
        state.getCurrentPage(),
    );
}

export function handlePageNumberClick({
    e,
    state,
    ui,
    patientsListEl,
    pageNumbersEl,
    randomNumber,
}) {
    const pageNumber = e.target.closest(".pagination__page-number");

    if (!pageNumber) return;

    // Go to selected page
    const page = Number(pageNumber.dataset.pageNumber);

    if (page === state.getCurrentPage()) return;

    state.setCurrentPage(page);

    const patients = getPatients(
        state.getAllPatients(),
        page,
        state.getPatientsPerPage(),
    );
    ui.renderPatients(patientsListEl, patients, randomNumber);

    ui.renderPaginationPageNumbers(
        pageNumbersEl,
        state.getTotalPages(),
        state.getCurrentPage(),
    );
}
