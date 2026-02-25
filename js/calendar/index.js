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
