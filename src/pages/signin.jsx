import React from "react";
import InputComp from "../components/inputs/inputComp";
import ButtonComp from "../components/buttons/buttonComp";
import { Link, useNavigate } from "react-router-dom";
import Facebook from "../assets/icons/facebook.svg";
import Google from "../assets/icons/google.svg";

const Signin = () => {
    const navigate = useNavigate();
    const navigateToDashboard = () => {
        navigate("/dashboard");
    };
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
                    label="Email"
                    type="email"
                    placeholder="Example@email.com"
                />

                <InputComp
                    label="Password"
                    type="password"
                    placeholder="At least 8 characters"
                />
                <div className="text-end text-blue hover:underline cursor-not-allowed mb-4">
                    {" "}
                    Forgot Password
                </div>
                <ButtonComp variant="primary" onClick={navigateToDashboard}>Sign in </ButtonComp>
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
                        <span className="hidden md:block mr-1"> Sign in with</span>{" "}
                        Google
                    </ButtonComp>
                    <ButtonComp
                        variant="secondary"
                        onClick={navigateToDashboard}
                        icon={<img src={Facebook} alt="Facebook" />}
                    >
                        <span className="hidden md:block mr-1"> Sign in with</span>{" "}
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
