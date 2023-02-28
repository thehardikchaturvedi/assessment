import '../App.css';
import React, { useEffect, useState } from "react";
import { useNavigate  } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";


function Dashboard() {
    const navigate  = useNavigate();
    const dispatch = useDispatch();

    const [events, setEvents] = useState([]);
    const [basePrice, setBasePrice] = useState(0);

    const user = useSelector(state => state.user);

    useEffect(() => {
        if(!user){
            navigate("/");
        }
    }, [user]);

    useEffect(()=> {
        get();
    }, []);

    useEffect(() => {
        const t = events.reduce((total, v) => {
            return total + Number(v.price);
        }, 0);

        setBasePrice(t);
    }, [events]);

    const get = () => {
        const events = JSON.parse(localStorage.getItem("events"));
        setEvents(events?.filter(o => o.userId === user?.id) || []);
    }

    const deleteEvent = (id) => {
        const data = [];
        const events = JSON.parse(localStorage.getItem("events"));
        data.push(...events.filter(e => e.id != id));
        localStorage.setItem("events", JSON.stringify(data));
        get();
    }

    return (
        <div className="container-fluid py-4">
            <div className="row">
                <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center">
                        <h1 className="text-center text-primary">Events</h1>
                        <div>
                            <button className="btn btn-success" onClick={() => navigate("/createEvent")}>Add Event</button>
                            <button className="btn btn-danger ml-3" onClick={() => {
                                localStorage.removeItem("user");
                                dispatch({
                                    type: "SET_USER",
                                    user: undefined
                                });
                                navigate("/")
                                }}>Logout</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-12">
                    <h5>Total Base Price - {basePrice}</h5>
                    <div className="table-responsive">
                        <table className="table">
                            <thead className="thead-dark">
                            <tr>
                                <th scope="col">Event Name</th>
                                <th scope="col">Event Date</th>
                                <th scope="col">Event description</th>
                                <th scope="col">Price</th>
                                <th scope="col">Booking Type</th>
                                <th scope="col">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                events.map((event) => {
                                    return <tr key={event.id} className={event.bookingType === "Premium" ? "premium-booking" : "normal-booking"}>
                                        <td>{event.eventName}</td>
                                        <td>{event.eventDate}</td>
                                        <td>{event.eventDescription}</td>
                                        <td>{event.price}</td>
                                        <td>{event.bookingType}</td>
                                        <td>
                                            <button className="btn btn-sm btn-info" onClick={() => navigate("/updateEvent", {state: event})}>Edit</button>
                                            <button className="btn btn-sm btn-danger ml-2" onClick={() => deleteEvent(event.id)}>Delete</button>
                                        </td>
                                    </tr>
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
