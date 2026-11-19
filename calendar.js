// calendar.js

let currentDate = new Date();
let events = [];

//equivalent to python's calendar.monthcalendar(year, month)
export function getMonthCalendar(year, month) {

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let calendar = [];
    let week = [];

    //add empty days
    for (let i = 0; i < firstDay; i++) {
        week.push(null);
    }

    // days of the month
    for (let day = 1; day <= daysInMonth; day++) {

        week.push(day);

        if (week.length === 7) {
            calendar.push(week);
            week = [];
        }
    }

    // fill the last week with empty days
    if (week.length > 0) {
        while (week.length < 7) {
            week.push(null);
        }

        calendar.push(week);
    }

    return calendar;
}


// Render the calendar
export function renderCalendar() {

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const calendar = getMonthCalendar(year, month);

    const container = document.getElementById('calendar-body');
    const title = document.getElementById('calendar-title');

    
    title.textContent = currentDate.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
    });

    container.innerHTML = '';

    calendar.forEach(week => {

        week.forEach(day => {

            const dayElement = document.createElement('div');
            dayElement.classList.add('calendar-day');

            if (day === null) {
                dayElement.classList.add('empty-day');
            } else {

                const dayNumber = document.createElement('div');
                dayNumber.classList.add('day-number');
                dayNumber.textContent = day;

                dayElement.appendChild(dayNumber);

                // Add events for this date
                const dateString = new Date(year, month, day).toLocaleDateString('en-CA');

                const dayEvents = events.filter(event => event.date === dateString);

                dayEvents.forEach(event => {

                    const eventElement = document.createElement('div');
                    eventElement.classList.add('calendar-event');
                    eventElement.textContent = `${event.building}) - ${event.slot} -- reserved by :${event.reserved_by}`;

                    dayElement.appendChild(eventElement);
                });

                // Clicking a day
                dayElement.addEventListener('click', () => {
                    console.log('Selected date:', dateString);
                });
            }

            container.appendChild(dayElement);
        });
    });
}


// Navigate between months
export function changeMonth(offset) {

    currentDate.setMonth(currentDate.getMonth() + offset);

    renderCalendar();
}


// Add an event
export function addEvent(event) {

    events.push(event);

    renderCalendar();
}


// Initialize calendar
export function initializeCalendar(reservations) {

    console.log("Calling initializeCalendar...");

    document.getElementById('prev-month').addEventListener('click', () => {
        changeMonth(-1);
    });

    document.getElementById('next-month').addEventListener('click', () => {
        changeMonth(1);
    });

    events = reservations
    renderCalendar();
}