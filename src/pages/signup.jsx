import React from "react";
import InputComp from "../components/inputs/inputComp";
import ButtonComp from "../components/buttons/buttonComp";
import { Link } from "react-router-dom";
import Facebook from "../assets/icons/facebook.svg";
import Google from "../assets/icons/google.svg";

const Signup = () => {
    return (
        <div className="min-w-full  md:min-w-[388px] md:max-w-[388px]  flex flex-col gap-8 md:gap-12">
            <div className="font-sfpro">
                <div className=" font-semibold text-2xl md:text-4xl mb-7">
                    Signup here 👋
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
                <InputComp
                    label="Confirm Password"
                    type="password"
                    placeholder="At least 8 characters"
                />
                <div className="pt-4">
                    <ButtonComp variant="primary">Sign up </ButtonComp>
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
                        icon={<img src={Google} alt="google" />}
                    >
                        <span className="hidden md:block"> Sign up with</span>{" "}
                        Google
                    </ButtonComp>
                    <ButtonComp
                        variant="secondary"
                        icon={<img src={Facebook} alt="Facebook" />}
                    >
                        <span className="hidden md:block"> Sign up with</span>{" "}
                        Facebook
                    </ButtonComp>
                </div>
            </div>
            <div className="flex gap-2 justify-center text-base md:text-lg font-roboto">
                Already have an account?
                <Link to={"/"} className="text-blue hover:underline">
                    {" "}
                    Sign in
                </Link>
            </div>
        </div>
    );
};

export default Signup;
