import { createClient } from "@supabase/supabase-js";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

const Update = () => {
    const id = useParams();
    console.log(id.id);
    const supabaseUrl = 'https://ysyyenfpsdseakgmgeje.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzeXllbmZwc2RzZWFrZ21nZWplIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzg5NTE4NTYsImV4cCI6MTk5NDUyNzg1Nn0.GwwZPuYSF-pr6ujrjj3KDJwSV8oVJo_Hp8Rijgt1_KU';
    const supabase = createClient(supabaseUrl, supabaseKey);

    const navigate = useNavigate();

    const titleRef = useRef(null);
    const bodyRef = useRef(null);

    const [title, setTitle] = useState('');
    const [body,setBody] = useState('');

    const updatePost = async (event) => {

        event.preventDefault();
        const { data, error } = await supabase
            .from('posts')
            .update({
                title: titleRef.current.value,
                body: bodyRef.current.value
            })
            .eq('id', id.id)

        if (await error) {
            console.log(await error);
        }
        else {
            console.log(data);
            navigate('/', { replace: true })
        }
    }

    useEffect(
        () => {
            async function fetchPost() {
                let { data: post, error } = await supabase
                    .from('posts')
                    .select('*')
                    .eq('id', id.id)
                if (error) {
                    console.log(error);
                }
                else {
                    console.log(post[0].title);
                    console.log(post[0].body)
                    setTitle(post[0].title);
                    setBody(post[0].body)
                }
            }

            fetchPost();
        }
        , [])
        
    const titleHandler = () => {
        setTitle(titleRef.current.value);
    }

    const bodyHandler = () => {
        setBody(bodyRef.current.value);
    }

    return (
        <div className="container flex flex-col items-center justify-center my-4">
            <div className="heading">
                <h1 className="text-2xl text-cyan-600 py-2">
                    Update Post
                </h1>
            </div>
            <form className=" flex flex-col" onSubmit={updatePost}>
                { 
                        <div className="flex flex-col">
                            <h2>Title</h2>
                            <input value={title} className="border-2 border-gray-400 rounded" type="text" name="post-title" ref={titleRef} onChange={titleHandler}/>
                            <h2>Body</h2>
                            <textarea value={body} className=" border-2 border-gray-400 rounded" type="text" name="post-body" id="post-body" ref={bodyRef} onChange={bodyHandler} rows="8" cols="30" />
                            <button className="py-2 px-2 bg-blue-400 rounded my-2 text-white" >Update</button>
                            <Link to='/' className="text-center text-white w-full py-2 px-2 bg-red-400 rounded my-2" >Cancel</Link>
                        </div>
                }
            </form>
            
        </div>
    )
}

export default Update