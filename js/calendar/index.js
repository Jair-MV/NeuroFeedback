import * as api from "./calendar.api.js";
import { loadPatients } from "../patients/patients.api.js";

document.addEventListener("DOMContentLoaded", function () {
    const calendarEl = document.getElementById("calendar");
    const calendar = new FullCalendar.Calendar(calendarEl, {
        locale: "es",
        slotLabelFormat: {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        },
        eventTimeFormat: {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        },

        initialView: "dayGridMonth",
        aspectRatio: 1.8,
        editable: true,
        headerToolbar: {
            start: "prev,next today",
            center: "title",
            end: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
        },
    });
    calendar.render();

    // Init calendar with saved dates
    async function init() {
        // 1. Load all patients
        const patients = await loadPatients();
        // 2. Get all dates
        const dates = await api.getAllDates();
        // 3. Render dates
        dates.forEach((d) => {
            const patientName = patients.find(
                (p) => p.id === d.patientId,
            ).fullName;

            calendar.addEvent({
                title: patientName,
                start: d.sessionTime,
            });
        });
    }

    init();
});
