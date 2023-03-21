import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import AuthStatusContext from "../store/AuthContext";

const SinglePost = () => {
    const { id } = useParams();

    const supabaseUrl = 'https://ysyyenfpsdseakgmgeje.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzeXllbmZwc2RzZWFrZ21nZWplIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzg5NTE4NTYsImV4cCI6MTk5NDUyNzg1Nn0.GwwZPuYSF-pr6ujrjj3KDJwSV8oVJo_Hp8Rijgt1_KU';
    const supabase = createClient(supabaseUrl, supabaseKey);

    const [individualPost, setIndividualPost] = useState([]);
    const authCtx = useContext(AuthStatusContext);

    const userData = authCtx.userInfo;
    console.log(userData);
    const navigate = useNavigate();


    const deletePost = async () => {

        const { data, error } = await supabase
            .from('posts')
            .delete()
            .eq('id', id)

        if (await error) {
            console.log(await data);
            console.log(await error);
        }
        else {
            navigate('/', { replace : true })
        }

    }

    let updateButton =
        <Link to={'/update/post/' + id}  className="inline-block bg-amber-300	text-zinc-800 px-2 rounded mx-2">
            update
        </Link>

    const deleteButton =
        <button onClick={deletePost} className="inline-block bg-red-800 text-white px-2 rounded mx-2">
            delete
        </button>

    useEffect(
        () => {
            async function fetchIndividualPost() {

                let { data: post, error } = await supabase
                    .from('posts')
                    .select('*')
                    .eq('id', id)
                if (error) {
                    console.log(error)
                }
                else {
                    setIndividualPost(post)
                }
            }

            fetchIndividualPost();
        }, []
    )
    return (
        <div>
            {individualPost && individualPost.map(
                (item) =>
                    <div key={item.id} >
                        <div className="">
                            <h1 className="inline text-2xl mx-2 my-2 py-2 px-2 text-zinc-700">{item.title}</h1>
                            {(item.email === userData) ? updateButton : null}
                            { (item.email === userData) ? deleteButton : null }
                        </div>
                        <p className="text-xl mx-2 my-2 py-2 px-2 text-slate-600"> {item.body} </p>
                    </div>
            )}
        </div>
    )
}

export default SinglePost