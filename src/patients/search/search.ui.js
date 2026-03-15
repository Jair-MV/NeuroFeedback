export function openSearchResults(container) {
    container.dataset.state = "visible";
}

export function closeSearchResults(container) {
    container.dataset.state = "";
}

export function renderSearchResultsRows(container, patients) {
    container.innerHTML = "";

    patients.forEach((p) => {
        const rowMarkup = `
            <div class="search-results__row" data-patient-id=${p.id}>
                <p class="search-results__name">
                    ${p.fullName}
                </p>
                &bull;
                <p class="search-results__gender">${p.gender}</p>
                <p class="search-results__age">${p.age} años</p>
            </div>
        `;

        container.insertAdjacentHTML("beforeend", rowMarkup);
    });
}
