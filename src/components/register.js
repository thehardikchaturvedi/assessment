import '../App.css';
import React, {useState} from "react";
import { useNavigate  } from "react-router-dom";

function Register() {
    const navigate  = useNavigate();
    const [params, setParams] = useState({});
    const [error, setError] = useState("");

    const valueChange = (e) => {
        const {value, name} = e.target;
        setParams({...params,[name] : value});
    }

    const register = () => {
        const users = [];

        users.push(...JSON.parse(localStorage.getItem("users")) || []);
        let id = users.length ? users[users.length - 1].id + 1 : 1;


        const exist = users.find((u) => u?.email == params.email);
        if(!exist){
            users.push({...params, id});
            localStorage.setItem("users", JSON.stringify(users));
            setParams({});
            navigate("/");
        }else{
            setError("User already Registered");
        }
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 col-md-4 mx-auto">
                    <div className="wrapper">
                        <div className="card p-4">
                            <h1 className="text-primary mb-4">Register</h1>
                            <form method="post" onSubmit={(e) => {
                                e.preventDefault();
                                register();
                            }}>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        onChange={e => {
                                            valueChange(e);
                                        }}
                                        value={params.email || ""}
                                        required
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="Enter email"
                                    />
                                    {
                                        error === "User already Registered" && <p className={"text-danger"}>Email Already Exist</p>
                                    }
                                </div>

                                <div className="form-group">
                                    <label>User Name</label>
                                    <input
                                        onChange={e => {
                                            valueChange(e);
                                        }}
                                        value={params.username || ""}
                                        required
                                        type="text"
                                        name="username"
                                        className="form-control"
                                        placeholder="Enter User Name"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Password</label>
                                    <input
                                        onChange={e => {
                                            valueChange(e);
                                        }}
                                        value={params.password || ""}
                                        required
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        placeholder="Enter Password"
                                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                        title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                                    />
                                </div>

                                <div className="form-group d-flex justify-content-between align-items-center">
                                    <button type="submit" className="btn btn-success">Register</button>
                                    <a href="" onClick={() => navigate("/")}>Already Registered ? Login Now</a>
                                    {/*<button className="btn btn-warning ml-3 text-white" onClick={() => navigate("/")}>Login</button>*/}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
