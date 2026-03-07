import * as api from "./calendar.api.js";
import * as state from "./calendar.state.js";
import { loadPatients, loadPatient } from "../patients/patients.api.js";

async function handleEventDrop(eventDropInfo) {
    const formatedDate = formatDate(eventDropInfo.event.startStr);

    const [date, time] = formatedDate.split(" ");

    const updatedDate = {
        id: eventDropInfo.event.extendedProps.dateId,
        patientId: state.getPatient().id,
        sessionDate: date,
        sessionTime: `${date} ${time}`,
    };

    await api.updateDate(updatedDate);
}

async function handleDateClick(info, calendar) {
    if (info.view.type === "dayGridMonth") return;

    const patient = state.getPatient();

    const formatedDate = formatDate(info.dateStr);

    const [date, time] = formatedDate.split(" ");

    const dateObj = {
        patientId: patient.id,
        sessionDate: date,
        sessionTime: `${date} ${time}`,
    };

    const updatedDate = await api.saveDate(dateObj);

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
        console.log(filteredDates);
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
    console.log(dates);
    if (!dates.length) return;

    dates.forEach(async function (d) {
        d.remove();
        await api.deleteDate(d.extendedProps.dateId);
    });
    state.setDatesArr([]);

    const deleteButton = document.querySelector(".fc-deleteButton-button");
    deleteButton.classList.add("delete-btn");
    deleteButton.classList.remove("delete-btn-active");
}

function formatDate(dateStr) {
    const date = new Date(dateStr);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function getURLPatientId() {
    const params = new URLSearchParams(window.location.search);
    return params.get("patientId");
}

export async function init(calendar) {
    const patientId = getURLPatientId();
    let patients = await loadPatients();
    let dates = [];

    if (patientId) {
        calendar.on("dateClick", function (info) {
            handleDateClick(info, calendar);
        });
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

        dates = await api.findByPatientId(patientId);
        const patient = await loadPatient(patientId);
        state.setPatient(patient);
    } else {
        dates = await api.getAllDates("2026-03-28");
    }

    dates.forEach((d) => {
        const patientName = patients.find((p) => p.id === d.patientId).fullName;

        calendar.addEvent({
            title: patientName,
            start: d.sessionTime,
            extendedProps: { dateId: d.id },
        });
    });
}
