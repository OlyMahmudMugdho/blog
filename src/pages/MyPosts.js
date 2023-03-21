import { createClient } from "@supabase/supabase-js";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthStatusContext from "../store/AuthContext";

const MyPosts = () => {

    const supabaseUrl = 'https://ysyyenfpsdseakgmgeje.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzeXllbmZwc2RzZWFrZ21nZWplIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzg5NTE4NTYsImV4cCI6MTk5NDUyNzg1Nn0.GwwZPuYSF-pr6ujrjj3KDJwSV8oVJo_Hp8Rijgt1_KU';
    const supabase = createClient(supabaseUrl, supabaseKey);

    const navigate = useNavigate();
    const AuthCtx = useContext(AuthStatusContext);
    console.log(AuthCtx.userInfo)
    const [allPosts, setAllPosts] = useState([]);

    useEffect(
        () => {
            async function fetchData() {
                let { data: posts, error } = await supabase
                    .from('posts')
                    .select('id,title,body,email')
                    .eq('email', AuthCtx.userInfo)

                if (error) {
                    console.log(error)
                }
                else {
                    console.log(posts)
                    setAllPosts(posts)
                }
            }

            fetchData();
            navigate('/myposts', { replace: true })
        }, []
    )

    return (
        <div className="flex flex-col mx-8">
            <div className="flex justify-center items-center">
                <h1 className="text-2xl text-cyan-600 py-2 "> My Posts </h1>
            </div>
            {allPosts &&
                allPosts.map(
                    (record) =>
                        <div key={record.id} className="card border inline-block py-4 px-4 my-2">
                            <h2 className="text-zinc-800 text-xl" >{record.title}</h2>
                            <p className="indent-2"><i className="text-sm">by {record.email}</i></p>
                            <p className="text-zinc-600">{record.body.substring(0, 50)}...</p>
                            <Link to={'/post/' + record.id} className="text-blue-500">view details</Link>
                        </div>
                )
            }
        </div>
    )
}

export default MyPosts