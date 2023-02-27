import React, { useContext, useState } from "react";
import axios from "axios";
import { isValidEmail } from "../utils/emailValidation";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../utils/helper";

const LoginPage = () => {
    const { setIsLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const handleLogin = async (e) => {
        e.preventDefault();

        if (user.email !== "" && user.password !== "") {
            if (isValidEmail(user.email)) {
                try {
                    const res = await axios.post(`${BASE_URL}/auth/login`, user, {
                        withCredentials: true,
                    });

                    if (res.data.success) {
                        setIsLoggedIn(true);
                        navigate("/home");
                    }
                } catch (e) {
                    alert("Error " + JSON.stringify(e.response.data.message));
                }
            } else {
                alert("Please enter a valid email address");
            }
        } else {
            alert("Please fill all the fields");
        }
    };

    return (
        <div className="container flex h-screen px-5 py-24 mx-auto">
            <div className="flex items-center justify-center w-full">
                <form
                    method="post"
                    className="relative z-10 flex flex-col w-full p-8 mx-auto mt-10 bg-white rounded-lg shadow-md sm:1/3 md:w-1/2 lg:w-1/3 bg-formbg md:mt-0"
                >
                    <h2 className="mb-1 text-3xl font-semibold text-center text-black title-font">
                        Welcome back!
                    </h2>
                    <div className="relative mb-4">
                        <label htmlFor="email" className="text-sm leading-7 text-brown">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out border border-gray-300 rounded outline-none bg-formbg focus:border-brown focus:ring-1 focus:ring-brown"
                            required
                            onChange={(e) => {
                                setUser({ ...user, email: e.target.value });
                            }}
                        />
                    </div>
                    <div className="relative mb-4">
                        <label htmlFor="password" className="text-sm leading-7 text-brown">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            minLength="8"
                            className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out border border-gray-300 rounded outline-none bg-formbg focus:border-brown focus:ring-1 focus:ring-brown"
                            autoComplete="on"
                            required
                            onChange={(e) => {
                                setUser({ ...user, password: e.target.value });
                            }}
                        />
                    </div>
                    <button
                        type="submit"
                        id="signupBtn"
                        className="px-6 py-2 mt-3 mb-2 text-lg text-white border-0 rounded bg-primary bg-brown focus:outline-none hover:bg-brown"
                        onClick={handleLogin}
                    >
                        Log In
                    </button>
                    <p>
                        Don't have an account?
                        <Link to="/register" className="ml-1 text-primary">
                            Create account
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
