import { bindOverlayEvents } from "./patients.handlers.js";
import { state } from "./patients.state.js";
import { isAdult } from "../shared/utils.js";

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
                    href="#"
                    class="u-margin button"
                    style="--margin-r-value: 1rem"
                    ><ion-icon name="calendar-outline"></ion-icon
                    >Agendar</a
                >
                <a href="#" class="button" data-action="details"
                    ><ion-icon name="document-text-outline"></ion-icon
                    >Detalles</a
                >
            </article>
        `;

        container.insertAdjacentHTML("beforeend", patientMarkup);
    });
}

export function renderPaginationPageNumbers(container, totalPages) {
    container.innerHTML = "";

    Array.from({ length: totalPages + 1 }, function (_, i) {
        const activeClass =
            i === state.currentPage ? "pagination__page-number--active" : "";

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

export function patientDetailsModal(action, patient) {
    const overlay = document.querySelector(".patient-overlay");

    if (action === "open") {
        overlay.innerHTML = createPatientExtendedMarkup(patient);
        overlay.dataset.state = "open";

        const card = overlay.querySelector(".patient-card--extended");

        requestAnimationFrame(() => {
            card.dataset.state = "open";
        });

        bindOverlayEvents(overlay);
        return;
    }

    if (action === "close") {
        if (overlay.dataset.state !== "open") return;

        const card = overlay.querySelector(".patient-card--extended");
        if (!card) return;

        card.dataset.state = "closed";
        overlay.dataset.state = "closed";

        card.addEventListener(
            "transitionend",
            () => {
                overlay.innerHTML = "";
            },
            { once: true },
        );
    }
}

export function createPatientExtendedMarkup(patient) {
    return `
        <article class="patient-card patient-card--extended" data-state="closed">
            ${renderHeader(patient)}
            ${renderDiagnosis(patient)}
            ${renderReason(patient)}
            ${!isAdult(patient.age) ? renderTutor(patient) : ""}
            ${renderContact(patient)}
            ${renderFooter(patient)}
        </article>
    `;
}

export function renderHeader(patient) {
    return `
        <header class="patient-card__header u-display u-gap"
                style="--display-value:flex; --gap-value:2rem">
            <img src="img/ui-face-0.jpg" alt="Patient photo">

            <div>
                <p class="patient-card__name">${patient.fullName}</p>
                <p class="patient-card__gender">${patient.gender}</p>
            </div>

            <p class="age">
                <span>${patient.age}</span>
                <span>años</span>
            </p>

            <button type="button"
                    class="patient-card__close"
                    aria-label="Cerrar">
                ✕
            </button>
        </header>
    `;
}

export function renderDiagnosis(patient) {
    if (!patient.diagnosis) return "";

    return `
        <section class="patient-card__section">
            <p class="patient-card__diagnosis">${patient.diagnosis}</p>
        </section>
    `;
}

export function renderReason(patient) {
    if (!patient.notes) return "";

    return `
        <section class="patient-card__section">
            <h3 class="patient-card__section-title">Motivo de consulta</h3>
            <p>${patient.notes}</p>
        </section>
    `;
}

export function renderTutor(patient) {
    if (!patient.tutorFullName) return "";

    return `
        <section class="patient-card__section">
            <h3 class="patient-card__section-title">Tutor</h3>

            <dl class="patient-card__list">
                <div>
                    <dt>Nombre</dt>
                    <dd>${patient.tutorFullName}</dd>
                </div>
                <div>
                    <dt>Parentesco</dt>
                    <dd>${patient.relationship}</dd>
                </div>
            </dl>
        </section>
    `;
}

export function renderContact(patient) {
    if (!patient.contactPhone || !patient.email) return "";

    const formatedContactPhone = `${patient.contactPhone.slice(0, 2)} ${patient.contactPhone.slice(2)}`;

    return `
        <section class="patient-card__section">
            <h3 class="patient-card__section-title">Contacto</h3>

            <dl class="patient-card__list">
                ${
                    patient.contactPhone
                        ? `
                    <div>
                        <dt>Teléfono</dt>
                        <dd><a href="tel:${patient.contactPhone}">${formatedContactPhone}</a></dd>
                    </div>
                `
                        : ""
                }

                ${
                    patient.email
                        ? `
                    <div>
                        <dt>Correo</dt>
                        <dd><a href="mailto:${patient.email}">${patient.email}</a></dd>
                    </div>
                `
                        : ""
                }
            </dl>
        </section>
    `;
}

export function renderFooter(patient) {
    return `
        <footer class="patient-card__footer u-display u-gap"
                style="--display-value:flex; --gap-value:1rem">
            <a href="#" class="button">
                <ion-icon name="calendar-outline"></ion-icon>
                Agendar
            </a>

            <a href="pages/form.html?patientId=${patient.id}" class="button">
                <ion-icon name="create-outline"></ion-icon>
                Editar
            </a>

            <a href="#" class="button button--delete">
                <ion-icon name="close-outline"></ion-icon>
                Eliminar
            </a>
        </footer>
    `;
}
