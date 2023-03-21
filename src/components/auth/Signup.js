import { createClient } from "@supabase/supabase-js";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
const Signup = () => {

    const supabaseUrl = 'https://ysyyenfpsdseakgmgeje.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzeXllbmZwc2RzZWFrZ21nZWplIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzg5NTE4NTYsImV4cCI6MTk5NDUyNzg1Nn0.GwwZPuYSF-pr6ujrjj3KDJwSV8oVJo_Hp8Rijgt1_KU';
    const supabase = createClient(supabaseUrl, supabaseKey);

    const signUpEmailRef = useRef(null);
    const signUpPasswordRef = useRef(null);
    const signUpNameRef = useRef(null);

    const navigate = useNavigate();

    const doSignUp = async (event) => {

        event.preventDefault();

        let { data, error } = await supabase.auth.signUp({
            email: signUpEmailRef.current.value,
            password: signUpPasswordRef.current.value
        })


        const { nameData, nameError } = await supabase
            .from('users')
            .insert([
                {
                    name: signUpNameRef.current.value,
                    email: signUpEmailRef.current.value
                },
            ])

        console.log(await data);
        console.log(await nameData);

        if (await error) {
            console.log(error);
        }
        else if (await !error) {
            console.log("SignUp Successfull");
            alert("An confirmation E-mail sent to your inbox, click the link to activate account");
            navigate('/auth', { replace: true });
        }

        if (await nameError) {
            console.log(nameError);
        }
        else if (await !nameError) {
            console.log("Name added to Database Successfull");
        }

    }

    return (
        <div className="w-full flex justify-center items-center">
            <div className="container flex flex-col my-4 mx-4 md:w-2/5 w-4/5 ">
                <h1 className="text-teal-800 text-xl">Sign Up</h1>
                <form onSubmit={doSignUp} className="flex flex-col">
                    <label htmlFor="signup-email">E-mail</label>
                    <input className="border border-slate-500 rounded" type="email" name="signup-email" id="signup-email" ref={signUpEmailRef} />
                    <label htmlFor="signup-password">Password</label>
                    <input className="border border-slate-500 rounded" type="password" name="signup-password" id="signup-password" ref={signUpPasswordRef} />
                    <label htmlFor="signup-name">Name</label>
                    <input className="border border-slate-500 rounded" type="text" name="signup-name" id="signup-name" ref={signUpNameRef} />
                    <button className="border-2 rounded w-full my-2 bg-green-500 text-white">Sign-Up</button>
                </form>
            </div>
        </div>
    )
}

export default Signup