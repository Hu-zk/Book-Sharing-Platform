import React from 'react'

function CalendarList({events}) {
    

    if (!events) {
        return <p>Loading events...</p>;
    }

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    return (
        <div className="table-container">
            <table id="calendarTable">
                <thead>
                    <tr>
                        <th>Day of Week</th>
                        <th>Recipe Name</th>
                        <th>Recipe Cuisine</th>
                    </tr>
                </thead>
                <tbody id="calendarBody">
                {events.map((event, index) => (
                    <tr key={index}>
                        <td>{daysOfWeek[event.day_of_week - 1]}</td>
                        <td>{event.recipe.name}</td>
                        <td>{event.recipe.cuisine}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default CalendarList