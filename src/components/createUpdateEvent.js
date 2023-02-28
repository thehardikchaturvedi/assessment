import '../App.css';
import React, {useEffect, useState} from "react";
import { useNavigate, useLocation  } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";


function CreateUpdateEvent() {
    const navigate  = useNavigate();
    const dispatch = useDispatch();

    const {state} = useLocation();
    const user = useSelector(state => state.user);


    useEffect(() => {
        if(!user){
            navigate("/");
        }
    }, [user]);


    const [params, setParams] = useState(state ? state : {});

    const valueChange = (e) => {
        const {value, name} = e.target;
        setParams({...params,[name] : value});
    }

    const createEvent = () => {
        const data = [];
        // const user = {id : 1};
        const old = JSON.parse(localStorage.getItem("events"));
        let id = 1;
        if(old){
            data.push(...old);
            id = old.length ? old[old.length - 1].id + 1 : 1;
        }

        if(state?.id){
            const event = data.find(o => o.id == state.id);
            for (const a in event) {
                event[a] = params[a];
            }
        }else{
            data.push({id, userId: user.id, ...params});
        }

        localStorage.setItem("events", JSON.stringify(data));
        setParams({});
        navigate("/dashboard");
    }

    return (
        <div className="container-fluid py-4">
            <div className="row">
                <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center">
                        <h1 className="text-center text-primary">{state?.id ? "Update" : "Create"} Event</h1>
                        <div>
                            <button className="btn btn-success" onClick={() => navigate("/dashboard")}>Events</button>
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
                <div className="col-12 col-md-5 mx-auto">
                    <div className={"card p-4"}>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            createEvent();
                        }}>
                            <div className="form-group">
                                <label>Event name</label>
                                <input
                                    onChange={e => {
                                        valueChange(e);
                                    }}
                                    value={params.eventName}
                                    required
                                    type="text"
                                    name="eventName"
                                    className="form-control"
                                    placeholder="Enter Event name"
                                />
                            </div>

                            <div className="form-group">
                                <label>Event date</label>
                                <input
                                    onChange={e => {
                                        valueChange(e);
                                    }}
                                    value={params.eventDate}
                                    required
                                    type="date"
                                    name="eventDate"
                                    className="form-control"
                                    placeholder="Enter Event date"
                                />
                            </div>

                            <div className="form-group">
                                <label>Event description</label>
                                <textarea
                                    onChange={e => {
                                        valueChange(e);
                                    }}
                                    value={params.eventDescription}
                                    name="eventDescription"
                                    required
                                    className="form-control"
                                    placeholder="Enter Event description"
                                >
                            </textarea>
                            </div>

                            <div className="d-flex align-items-center justify-content-between">
                                <div className="form-group">
                                    <label>Price</label>
                                    <input
                                        onChange={e => {
                                            valueChange(e);
                                        }}
                                        value={params.price}
                                        required
                                        type="number"
                                        name="price"
                                        className="form-control"
                                        placeholder="Enter Price"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Booking Type</label>
                                    <div>
                                        <label>Normal</label>
                                        <input
                                            required
                                            onChange={e => {
                                                valueChange(e);
                                            }}
                                            value="Normal"
                                            type="radio"
                                            name="bookingType"
                                            checked={params.bookingType === "Normal"}
                                        />
                                        <label className="ml-5">Premium</label>
                                        <input
                                            onChange={e => {
                                                valueChange(e);
                                            }}
                                            type="radio"
                                            value="Premium"
                                            name="bookingType"
                                            checked={params.bookingType === "Premium"}
                                        />
                                    </div>
                                </div>
                            </div>

                            {
                                !state?.id && <div className="form-group">
                                    <input
                                        type="checkbox"
                                        required
                                    />
                                    <label className={"pl-2"}>I accept terms & conditions</label>
                                </div>
                            }

                            <div className="form-group">
                                <button type="submit" className="btn btn-success">{state?.id ? "Update" : "Create"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateUpdateEvent;
