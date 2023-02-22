import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const isValidEmail = (email) => {
    const regEx =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regEx.test(String(email).toLowerCase());
};

const SignUpPage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (user.name !== "" && user.email !== "" && user.password !== "") {
            if (isValidEmail(user.email)) {
                try {
                    const res = await axios.post(
                        "http://localhost:4000/api/auth/signup",
                        user,
                        { withCredentials: true }
                    );
                    console.log("singup res", res.data);

                    if (res.data.success) {
                        navigate("/home");
                    }
                } catch (e) {
                    console.log("error", e);
                    console.log(e.response.data);
                    alert(e.response.data.message);
                }
            } else {
                alert("Please enter a valid email address");
            }
        } else {
            alert("Please fill all the fields");
        }
    };

    return (
        <div className="container px-5 py-24 mx-auto flex h-screen">
            <div className="w-full flex justify-center items-center">
                <form className="bg-white sm:1/3 md:w-1/2 lg:w-1/3 bg-formbg rounded-lg p-8 flex flex-col mx-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
                    <h2 className="text-black text-3xl text-center mb-1 font-semibold title-font">
                        Create an Account
                    </h2>
                    <div className="relative mb-4">
                        <label htmlFor="name" className="leading-7 text-sm text-brown">
                            Username
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            minLength="3"
                            className="w-full bg-formbg rounded border border-gray-300 focus:border-brown focus:ring-1 focus:ring-brown text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            required
                            onChange={(e) => {
                                setUser({ ...user, name: e.target.value });
                            }}
                        />
                    </div>
                    <div className="relative mb-4">
                        <label htmlFor="email" className="leading-7 text-sm text-brown">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full bg-formbg rounded border border-gray-300 focus:border-brown focus:ring-1 focus:ring-brown text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            required
                            onChange={(e) => {
                                setUser({ ...user, email: e.target.value });
                            }}
                        />
                    </div>
                    <div className="relative mb-4">
                        <label htmlFor="password" className="leading-7 text-sm text-brown">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            minLength="8"
                            className="w-full bg-formbg rounded border border-gray-300 focus:border-brown focus:ring-1 focus:ring-brown text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            autoComplete="on"
                            required
                            onChange={(e) => {
                                setUser({ ...user, password: e.target.value });
                            }}
                        />
                    </div>
                    {/* <div className="relative mb-8">
                    <label htmlFor="confPassword" className="leading-7 text-sm text-brown">Confirm Password</label>
                    <input type="password" id="confPassword" name="confPassword" minLength="8"
                        className="w-full bg-formbg rounded border border-gray-300 focus:border-brown focus:ring-1 focus:ring-brown text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        autoComplete="on" required />
                </div> */}
                    <button
                        type="submit"
                        id="signupBtn"
                        className="bg-primary text-white bg-brown border-0 py-2 px-6 focus:outline-none hover:bg-brown rounded text-lg"
                        onClick={handleSignUp}
                    >
                        Sign Up
                    </button>
                    <p>
                        Already have an account?
                        <Link to="/" className="text-primary ml-2">
                            Login here
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SignUpPage;
