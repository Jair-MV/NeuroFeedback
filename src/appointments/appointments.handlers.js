import * as repository from "./appointments.repository.js";
import * as state from "./appointments.state.js";

import { loadPatients } from "../shared/repository.js";
import { loadPatient } from "../shared/repository.js";

async function handleEventDrop(eventDropInfo) {
    const formatedDate = formatDate(new Date(eventDropInfo.event.startStr));

    // Get Patient ID
    const dateId = eventDropInfo.event.extendedProps.dateId;

    const patientId = eventDropInfo.event.extendedProps.patientId;

    const [date, time] = formatedDate;

    const updatedDate = {
        id: dateId,
        patientId,
        sessionDate: date,
        sessionTime: `${date} ${time}`,
    };

    await repository.updateDate(updatedDate);
}

async function handleDateClick(info, calendar) {
    if (info.view.type === "dayGridMonth") return;

    const patient = state.getPatient();

    const formatedDate = formatDate(new Date(info.dateStr));
    const [date, time] = formatedDate;

    const dateObj = {
        patientId: patient.id,
        sessionDate: date,
        sessionTime: `${date} ${time}`,
    };

    const updatedDate = await repository.saveDate(dateObj);

    calendar.addEvent({
        title: patient.fullName,
        start: info.dateStr,
        extendedProps: { dateId: updatedDate.id },
    });
}

function handleEventClick(eventClickInfo) {
    const event = eventClickInfo.event;

    const deleteButton = document.querySelector(".fc-deleteButton-button");

    if (!event.backgroundColor) {
        event.setProp("backgroundColor", "#e03131");
        state.setDate(event);
    } else {
        event.setProp("backgroundColor", "");
        const dates = state.getDates();
        const dateId = event.extendedProps.dateId;
        const filteredDates = dates.filter(
            (d) => d.extendedProps.dateId !== dateId,
        );

        state.setDatesArr(filteredDates);
    }

    if (state.getDates().length) {
        deleteButton.classList.remove("delete-btn");
        deleteButton.classList.add("delete-btn-active");
    } else {
        deleteButton.classList.add("delete-btn");
        deleteButton.classList.remove("delete-btn-active");
    }
}

async function handleDelete() {
    const dates = state.getDates();

    if (!dates.length) return;

    dates.forEach(async function (d) {
        d.remove();
        await repository.deleteDate(d.extendedProps.dateId);
    });
    state.setDatesArr([]);

    const deleteButton = document.querySelector(".fc-deleteButton-button");
    deleteButton.classList.add("delete-btn");
    deleteButton.classList.remove("delete-btn-active");
}

let loadedMonths = new Set();

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return [`${year}-${month}-${day}`, `${hours}:${minutes}:${seconds}`];
}

function getVisibleMonths(start, end) {
    const months = new Set();

    const current = new Date(start);
    current.setDate(1);

    while (current < end) {
        const [month] = formatDate(current);
        months.add(month);
        current.setMonth(current.getMonth() + 1);
    }

    return months;
}

async function handleDatesSet({ dateInfo, calendar, patient }) {
    const visibleMonths = getVisibleMonths(dateInfo.start, dateInfo.end);
    const patients = await loadPatients();

    for (const month of visibleMonths) {
        if (!loadedMonths.has(month) || patient) {
            loadedMonths.add(month);
            let dates = await repository.getAllDates(month);

            if (patient) {
                dates = dates.filter((d) => d.patientId === patient.id);
            }

            dates.forEach((d) => {
                const patientName = patients.find(
                    (p) => p.id === d.patientId,
                ).fullName;

                calendar.addEvent({
                    title: patientName,
                    start: d.sessionTime,
                    extendedProps: { dateId: d.id, patientId: d.patientId },
                });
            });
        }
    }
}

export function setGeneralSetUp() {
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

    return calendar;
}

export async function setPatientSetUp({ patientId, calendar }) {
    calendar.on("dateClick", function (info) {
        handleDateClick(info, calendar);
    });
    calendar.on("eventDrop", handleEventDrop);
    calendar.setOption("eventClick", handleEventClick);
    calendar.setOption("editable", true);
    calendar.setOption("customButtons", {
        deleteButton: {
            text: "Eliminar",
            click: handleDelete,
        },
    });
    calendar.setOption("footerToolbar", {
        right: "deleteButton",
    });

    const deleteButton = document.querySelector(".fc-deleteButton-button");
    deleteButton.classList.add("delete-btn");

    const dates = await repository.findByPatientId(patientId);
    const patient = await loadPatient(patientId);
    state.setPatient(patient);

    dates.forEach((d) => {
        calendar.addEvent({
            title: patient.fullName,
            start: d.sessionTime,
            extendedProps: { dateId: d.id },
        });
    });
}

export function setOverviewSetUp(calendar) {
    calendar.on("datesSet", (dateInfo) =>
        handleDatesSet({ dateInfo, calendar }),
    );
    calendar.on("eventDrop", handleEventDrop);
    calendar.setOption("editable", true);
    calendar.setOption("eventClick", handleEventClick);
    calendar.setOption("customButtons", {
        deleteButton: {
            text: "Eliminar",
            click: handleDelete,
        },
    });
    calendar.setOption("footerToolbar", {
        right: "deleteButton",
    });

    const deleteButton = document.querySelector(".fc-deleteButton-button");
    deleteButton.classList.add("delete-btn");

    const view = calendar.view;
    const dateInfo = { start: view.activeStart, end: view.activeEnd };

    handleDatesSet({ dateInfo, calendar });
}

export async function handleSearchFormSubmit({ globalState, calendar }) {
    const searchedPatients = globalState.getAllPatients();

    calendar.getEvents().forEach((event) => event.remove());

    const view = calendar.view;
    const dateInfo = { start: view.activeStart, end: view.activeEnd };

    for (const patient of searchedPatients) {
        handleDatesSet({ dateInfo, calendar, patient });
    }
}

export function handleSearchResultClick(selectedPatient, calendar) {
    calendar.getEvents().forEach((event) => event.remove());
    const view = calendar.view;
    const dateInfo = { start: view.activeStart, end: view.activeEnd };
    handleDatesSet({ dateInfo, calendar, patient: selectedPatient });
}
