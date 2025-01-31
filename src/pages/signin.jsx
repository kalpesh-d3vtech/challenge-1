import React, { useEffect, useState } from "react";
import InputComp from "../components/inputs/inputComp";
import ButtonComp from "../components/buttons/buttonComp";
import { Link, useNavigate } from "react-router-dom";
import Facebook from "../assets/icons/facebook.svg";
import Google from "../assets/icons/google.svg";
import { apiPOST } from "../utils/apiHandler";

const Signin = () => {
    const navigate = useNavigate();

   
    const navigateToDashboard = () => {
        navigate("/dashboard");
    };

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const validateUsername = (username) => {
        if (!username) {
            setUsernameError("Username is required");
            return false;
        }
        return true;
    };
    

    const validatePassword = (password) => {
        if (!password) {
            setPasswordError("Password is required");
        }
        return password.length >= 8;
    };

    const handleUsernameChange = (event) => {
        const enteredUsername = event.target.value;
        setUsername(enteredUsername);
        if (validateUsername(enteredUsername)) {
            setUsernameError(""); 
        }
    };
    
    const handlePasswordChange = (event) => {
        const enteredPassword = event.target.value;
        setPassword(enteredPassword);
        setPasswordError(
            validatePassword(enteredPassword)
                ? ""
                : "Password must be at least 8 characters"
        );
    };
    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSubmit(event);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const isValidUsername = validateUsername(username);
        const isValidPassword = validatePassword(password);

        if (isValidUsername && isValidPassword) {
            try {
                const response = await apiPOST("/auth/login", {
                    username: username,
                    password: password,
                    expiresInMins: 60,
                });

                const { token, refreshToken } = response;

                localStorage.setItem("accessToken", token);
                localStorage.setItem("refreshToken", refreshToken);
                localStorage.setItem("username", username);

                navigateToDashboard();
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 401) {
                        alert(
                            "Invalid credentials. Please check your username and password."
                        );
                    } else if (error.response.status === 400) {
                        alert(error?.response?.data?.message || error?.message);
                    } else {
                        alert("An error occurred. Please try again later.");
                    }
                } else if (error.request) {
                    alert(
                        "No response from the server. Please check your network connection."
                    );
                } else {
                    console.error("Error:", error.message);
                    alert("An unexpected error occurred. Please try again.");
                }
            }
        }
    };


    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            navigateToDashboard();
        }
    }, [navigate]);

    return (
        <div className="min-w-full  md:min-w-[388px] md:max-w-[388px]  flex flex-col gap-8 md:gap-12">
            <div className="font-sfpro">
                <div className=" font-semibold text-2xl md:text-4xl mb-7">
                    Welcome Back 👋
                </div>
                <div className=" text-[15px] md:text-xl font-light">
                    Today is a new day. It's your day. You shape it. Sign in to
                    start managing your projects.
                </div>
            </div>
            <div>
                <InputComp
                    label="User Name"
                    type="username"
                    placeholder="Please enter your username"
                    name="username"
                    error={usernameError}
                    value={username}
                    onChange={handleUsernameChange}
                    handleKeyDown={handleKeyDown}
                />

                <InputComp
                    label="Password"
                    type="password"
                    placeholder="At least 8 characters"
                    name="password"
                    error={passwordError}
                    value={password}
                    onChange={handlePasswordChange}
                    handleKeyDown={handleKeyDown}
                />
                <div className="text-end text-blue hover:underline cursor-not-allowed mb-4">
                    {" "}
                    Forgot Password
                </div>
                <ButtonComp variant="primary" onClick={handleSubmit}>
                    Sign in{" "}
                </ButtonComp>
                <div className="text-xs mt-2">
                    You can use any user's credentials from{" "}
                    <Link
                        to={"https://dummyjson.com/users"}
                        target="_blank"
                        className="text-blue"
                    >
                        dummyjson.com/users
                    </Link>
                    .{" "}
                </div>
            </div>
            <div>
                <div className="flex gap-4 items-center mb-6">
                    <hr className="w-full" />
                    Or
                    <hr className="w-full" />
                </div>
                <div className="flex gap-4 md:flex-col ">
                    <ButtonComp
                        variant="secondary"
                        onClick={navigateToDashboard}
                        icon={<img src={Google} alt="google" />}
                    >
                        <span className="hidden md:block mr-1">
                            {" "}
                            Sign-in with
                        </span>{" "}
                        Google
                    </ButtonComp>
                    <ButtonComp
                        variant="secondary"
                        onClick={navigateToDashboard}
                        icon={<img src={Facebook} alt="Facebook" />}
                    >
                        <span className="hidden md:block mr-1">
                            {" "}
                            Sign-in with
                        </span>{" "}
                        Facebook
                    </ButtonComp>
                </div>
            </div>
            <div className="flex gap-2 justify-center text-base md:text-lg font-roboto">
                Don't you have an account?
                <Link to={"/signup"} className="text-blue hover:underline">
                    {" "}
                    Sign up
                </Link>
            </div>
        </div>
    );
};

export default Signin;
