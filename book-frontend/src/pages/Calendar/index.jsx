import React, { useEffect, useState } from 'react'
import "./style.css"
import CalendarList from '../../components/CalendarList'
import { sendRequest } from '../../core/config/request';
import { requestMethods } from '../../core/enums/requestMethods';

function Calendar() {

    const [events, setEvents] = useState('');
    
    useEffect(() => {
        const fetchData = async () =>{
            try {
                const response = await sendRequest({
                    route: "/user/calendar/events",
                    method: requestMethods.GET,
                });
                console.log(response.planned_meals)
                setEvents(response.planned_meals)
            } catch (error) {
                console.error('failed:', error);
            }
        }
    
        fetchData();
    }, []);

    return (
        <div className='home-page-container'>
            <div className='page-title'>Calendar :</div>
            <CalendarList events={events}/>
        </div>
    )
}

export default Calendar