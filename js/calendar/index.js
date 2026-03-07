<<<<<<< HEAD
"use strict";

document.addEventListener("DOMContentLoaded", function () {
    const calendarEl = document.getElementById("calendar");
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: "dayGridMonth",

        headerToolbar: {
            start: "prev,next today",
            center: "title",
            end: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
        },

        buttonText: {
            today: "Hoy",
            dayGridMonth: "mes",
            dayGridWeek: "semana",
            timeGridDay: "día",
            listWeek: "lista",
        },

        aspectRatio: 1.8,
    });
    calendar.render();
});
=======
import { init } from "./calendar.handlers.js";

const domLoadedPromise = new Promise((resolve) => {
    document.addEventListener("DOMContentLoaded", resolve);
});

await domLoadedPromise;

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
    headerToolbar: {
        start: "prev,next today",
        center: "title",
        end: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
    },
});

calendar.render();

init(calendar);
>>>>>>> calendar
