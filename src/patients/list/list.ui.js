export function renderPatients(container, patients, randomNumber) {
    container.innerHTML = "";

    patients.forEach((patient) => {
        const imgNumber = randomNumber(0, 5);

        const patientMarkup = `
            <article class="patient-card" data-patient-id="${patient.id}">
                <div
                    class="u-margin u-display u-gap"
                    style="
                        --margin-b-value: 2rem;
                        --display-value: flex;
                        --gap-value: 2rem;
                    "
                >
                    <img src="img/ui-face-${imgNumber}.jpg" alt="Patient photo" />

                    <div>
                        <p class="patient-card__name">
                            ${patient.fullName}
                        </p>
                        <p class="patient-card__gender">${patient.gender}</p>
                    </div>

                    <p class="age"><span>${patient.age}</span><span>años</span></p>
                </div>

                <p class="patient-card__diagnosis">${patient.diagnosis}</p>

                <a
                    href="pages/calendar.html?patientId=${patient.id}"
                    class="u-margin button"
                    style="--margin-r-value: 1rem"
                    ><ion-icon name="calendar-outline"></ion-icon
                    >Agendar</a
                >
                <button class="button" data-action="details"
                    ><ion-icon name="document-text-outline"></ion-icon
                    >Detalles</button
                >
            </article>
        `;

        container.insertAdjacentHTML("beforeend", patientMarkup);
    });
}

export function renderPaginationPageNumbers(
    container,
    totalPages,
    currentPage,
) {
    container.innerHTML = "";

    Array.from({ length: totalPages + 1 }, function (_, i) {
        const activeClass =
            i === currentPage ? "pagination__page-number--active" : "";

        const pageNumberMarkup = `
            <div
                data-page-number="${i}"
                class="pagination__page-number ${activeClass}"
            >
                ${i + 1}
            </div>
        `;

        container.insertAdjacentHTML("beforeend", pageNumberMarkup);
    });
}
