import { createClient } from '@supabase/supabase-js';
import { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthStatusContext from '../../store/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const supabaseUrl = 'https://ysyyenfpsdseakgmgeje.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzeXllbmZwc2RzZWFrZ21nZWplIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzg5NTE4NTYsImV4cCI6MTk5NDUyNzg1Nn0.GwwZPuYSF-pr6ujrjj3KDJwSV8oVJo_Hp8Rijgt1_KU';
    const supabase = createClient(supabaseUrl, supabaseKey);

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const AuthCtx = useContext(AuthStatusContext);

    const doLogin = async (event) => {
        event.preventDefault();
        const {data, error} = await supabase.auth.signInWithPassword({
            email: emailRef.current.value,
            password: passwordRef.current.value
        })
        console.log( await data);
        if(await error){
            console.log(error);
            AuthCtx.checkActive();
        }
        else{
            AuthCtx.checkActive();
            navigate('/', { replace : true })
            window.location.reload();
        }

    }
    return (
        <div className='container my-4 mx-4 text-center flex flex-col '>
            <h1 className='text-slate-700 text-xl' >Login</h1>
            <form className='flex flex-col' onSubmit={doLogin}>
                <label htmlFor="email">Email</label>
                <input className="border border-slate-500 rounded" type="email" name="email" id="email" ref={emailRef} />
                <label htmlFor="password">Password</label>
                <input className="border border-slate-500 rounded" type="password" name="password" id="password" ref={passwordRef} />
                <button className="border-2 rounded w-full my-2 bg-green-500 text-white">
                    Login
                </button>
            </form>
            
        </div>
    )
}

export default Login