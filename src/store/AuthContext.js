import { createContext, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const AuthStatusContext = createContext({
    isActive: 0,
    userInfo: '',
    checkActive: () => { },
    setActive: () => { },
    setInactive: () => { }
})


export function AuthContext(props) {

    const supabaseUrl = 'https://ysyyenfpsdseakgmgeje.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzeXllbmZwc2RzZWFrZ21nZWplIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzg5NTE4NTYsImV4cCI6MTk5NDUyNzg1Nn0.GwwZPuYSF-pr6ujrjj3KDJwSV8oVJo_Hp8Rijgt1_KU';
    const supabase = createClient(supabaseUrl, supabaseKey);

    const [isActive, setActiveStatus] = useState(0.5);

    const [userInfo, setuserInfo] = useState('');

    const setActiveHandler = () => {
        setActiveStatus(1);
    }

    const setInactiveHandler = () => {
        setActiveStatus(0);
    }

    const checkActiveHandler = async () => {
        const { data, error } = await supabase.auth.getUser();
        console.log(await data);
        if (await error) {
            console.log(error);
            setActiveStatus(0);
        }
        else {
            setActiveStatus(1);
        }
    }

    useEffect(
        () => {
            async function getData() {
                const reCheck = async () => {
                    const { data, error } = await supabase.auth.getUser();
                    console.log(await data);
                    if (await error) {
                        console.log(error);
                    }
                    else {
                        setuserInfo(data.user.email);
                    }
                }

                reCheck();
            }

            getData();
        }
        , [])

    console.log(userInfo)


    const AuthStatusObject = {
        isActive: isActive,
        userInfo: userInfo,
        checkActive: checkActiveHandler,
        setActive: setActiveHandler,
        setInactive: setInactiveHandler
    }

    return (
        <AuthStatusContext.Provider value={AuthStatusObject} >
            {props.children}
        </AuthStatusContext.Provider>
    )
}

export default AuthStatusContext