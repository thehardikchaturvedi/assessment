import '../App.css';
import React, {useEffect, useState} from "react";
import { useNavigate  } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";


function Login() {
    const navigate  = useNavigate();
    const dispatch = useDispatch();
    const [params, setParams] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");

    const valueChange = (e) => {
        const {value, name} = e.target;
        setParams({...params,[name] : value});
    }

    const user = useSelector(state => state.user);


    useEffect(() => {
        if(user){
            navigate("/dashboard");
        }
    }, [user]);

    const login = () => {
        const users = [];
        setError("");

        users.push(...JSON.parse(localStorage.getItem("users")) || []);

        const exist = users.find((u) => u?.email == params.email);
        if(exist){

            if(exist.password != params.password){
                setError("Incorrect Password");
            }else{
                dispatch({
                    type: "SET_USER",
                    user: exist
                });
                localStorage.setItem("user", JSON.stringify(exist));
                navigate("/dashboard");
            }

        }else{
            setError("User not Registered");
        }
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 col-md-4 mx-auto">
                    <div className="wrapper">
                        <div className="card p-4">
                            <h1 className="mb-4 text-primary">Login</h1>
                            <form method="post" onSubmit={(e) => {
                                e.preventDefault();
                                login();
                            }}>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        onChange={e => {
                                            valueChange(e);
                                        }}
                                        value={params.email}
                                        required
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="Enter email"
                                    />
                                    {
                                        error === "User not Registered" && <p className={"text-danger"}>Email does't Exist</p>
                                    }
                                </div>

                                <div className="form-group">
                                    <label>Password</label>
                                    <input
                                        onChange={e => {
                                            valueChange(e);
                                        }}
                                        value={params.password}
                                        required
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        placeholder="Enter Password"
                                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                        title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                                    />
                                    {
                                        error === "Incorrect Password" && <p className={"text-danger"}>Password Is Incorrect</p>
                                    }
                                </div>

                                <div className="form-group d-flex justify-content-between align-items-center">
                                    <button type="submit" className="btn btn-success">Login</button>
                                    <a href="" onClick={() => navigate("register")}>Don't have account ? Register</a>
                                    {/*<button className="btn btn-warning ml-3 text-white" onClick={() => navigate("register")}>Register</button>*/}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
