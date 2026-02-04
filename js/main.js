// State
const state = {
    patients: [],
    patientsPerPage: 9,
};

// Utils
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Load patients
async function loadPatients(url) {
    const response = await fetch(url);
    const patients = await response.json();

    state.patients = patients;
}

// Get a limit number of patients
function getPatients(page) {
    // Calc indexes
    const startIndex = page * state.patientsPerPage;
    const endIndex = startIndex + state.patientsPerPage;

    const patients = state.patients.slice(startIndex, endIndex);

    return patients;
}

// Render patients
function renderPatients(patients, randomNumber) {
    const patientsListEl = document.querySelector(".patients-list");

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

        patientsListEl.insertAdjacentHTML("beforeend", patientMarkup);
    });
}

// Init
async function init() {
    await loadPatients("../patients-data.json");
    const patients = getPatients(1);
    renderPatients(patients, randomNumber);
}

init();
