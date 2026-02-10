///////////////////////////////////////////////
// Config
const DATA_URL = "../patients-data.json";
const PATIENTS_PER_PAGE = 9;

///////////////////////////////////////////////
// State
const state = {
    patients: [],
    patientsPerPage: PATIENTS_PER_PAGE,
    currentPage: 0,
};

function getTotalPages() {
    return Math.ceil(state.patients.length / state.patientsPerPage) - 1;
}

///////////////////////////////////////////////
// Utils
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isAdult(age) {
    return age >= 18;
}

// ///////////////////////////////////////////////
// DOM
const patientsListEl = document.querySelector(".patients-list");
const paginationEl = document.querySelector(".pagination");
const pageNumbersEl = document.querySelector(".pagination__page-numbers");
const overlayEl = document.querySelector(".patient-overlay");
const patientCardCloseButtonEl = document.querySelector(".patient-card__close");

// ///////////////////////////////////////////////
// Data

// Load patients
async function loadPatients(url) {
    const response = await fetch(url);
    const patients = await response.json();

    state.patients = patients;
}

function loadPatient(id) {
    return state.patients.find((p) => p.id === id);
}

// Get a limit number of patients
function getPatients(page) {
    // Calc indexes
    const startIndex = page * state.patientsPerPage;
    const endIndex = startIndex + state.patientsPerPage;

    const patients = state.patients.slice(startIndex, endIndex);

    return patients;
}

// ///////////////////////////////////////////////
// UI

// Render patients
function renderPatients(container, patients, randomNumber) {
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

function renderPaginationPageNumbers(container, totalPages) {
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

function patientDetailsModal(action, patient) {
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

function createPatientExtendedMarkup(patient) {
    return `
        <article class="patient-card patient-card--extended" data-state="closed">
            ${renderHeader(patient)}
            ${renderDiagnosis(patient)}
            ${renderReason(patient)}
            ${!isAdult(patient.age) ? renderTutor(patient) : ""}
            ${renderContact(patient)}
            ${renderFooter()}
        </article>
    `;
}

function renderHeader(patient) {
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

function renderDiagnosis(patient) {
    if (!patient.diagnosis) return "";

    return `
        <section class="patient-card__section">
            <p class="patient-card__diagnosis">${patient.diagnosis}</p>
        </section>
    `;
}

function renderReason(patient) {
    if (!patient.notes) return "";

    return `
        <section class="patient-card__section">
            <h3 class="patient-card__section-title">Motivo de consulta</h3>
            <p>${patient.notes}</p>
        </section>
    `;
}

function renderTutor(patient) {
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

function renderContact(patient) {
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

function renderFooter() {
    return `
        <footer class="patient-card__footer u-display u-gap"
                style="--display-value:flex; --gap-value:1rem">
            <a href="#" class="button">
                <ion-icon name="calendar-outline"></ion-icon>
                Agendar
            </a>

            <a href="pages/form.html" class="button">
                <ion-icon name="create-outline"></ion-icon>
                Editar
            </a>
        </footer>
    `;
}

function bindOverlayEvents(overlay) {
    const closeBtn = overlay.querySelector(".patient-card__close");

    closeBtn.addEventListener("click", closeExtendedPatientCard);
}

function closeExtendedPatientCard() {
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

///////////////////////////////////////////////
// Handlers
function handlePaginationButtonsClick(e) {
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

///////////////////////////////////////////////
// Events
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
    const patientID = detailsButton.closest(".patient-card").dataset.patientId;
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

///////////////////////////////////////////////
// Init
async function init() {
    await loadPatients(DATA_URL);
    const patients = getPatients(state.currentPage);
    renderPatients(patientsListEl, patients, randomNumber);
    renderPaginationPageNumbers(pageNumbersEl, getTotalPages());
}

init();
