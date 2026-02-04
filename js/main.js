// State
const state = {
    patients: [],
    patientsPerPage: 9,
    currentPage: 0,
    totalPages: null,
};

// Utils
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ///////////////////////////////////////////////
// DOM
const patientsListEl = document.querySelector(".patients-list");

// ///////////////////////////////////////////////
// Data

// Load patients
async function loadPatients(url) {
    const response = await fetch(url);
    const patients = await response.json();

    state.patients = patients;
    state.totalPages = Math.ceil(patients.length / state.patientsPerPage) - 1;
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
            <article class="patient-card">
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
                <a href="#" class="button"
                    ><ion-icon name="document-text-outline"></ion-icon
                    >Detalles</a
                >
            </article>
        `;

        container.insertAdjacentHTML("beforeend", patientMarkup);
    });
}

// Events
const paginationEl = document.querySelector(".pagination");

paginationEl.addEventListener("click", function (e) {
    const button = e.target.closest("button");

    if (!button) return;

    const currentPage = state.currentPage;
    const firstPage = 0;
    const lastPage = state.totalPages;

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
});

// Init
async function init() {
    await loadPatients("../patients-data.json");
    const patients = getPatients(state.currentPage);
    renderPatients(patientsListEl, patients, randomNumber);
}

init();
