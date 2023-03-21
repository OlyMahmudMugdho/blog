import { useRef } from "react"
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

const NewPost = () => {
    const supabaseUrl = 'https://ysyyenfpsdseakgmgeje.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzeXllbmZwc2RzZWFrZ21nZWplIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzg5NTE4NTYsImV4cCI6MTk5NDUyNzg1Nn0.GwwZPuYSF-pr6ujrjj3KDJwSV8oVJo_Hp8Rijgt1_KU';
    const supabase = createClient(supabaseUrl, supabaseKey);
    const navigate = useNavigate();

    const postTitleRef = useRef(null);
    const postBodyRef = useRef(null);

    const postData = async (event) => {

        event.preventDefault();


        let { data, error } = await supabase.auth.getUser();
        let usrEmail = await data.user.email;


        console.log(await usrEmail);

        const { pdata, perror } = await supabase
            .from('posts')
            .insert([
                {
                    title: postTitleRef.current.value,
                    body: postBodyRef.current.value,
                    email: usrEmail,
                    author: usrEmail
                },
            ])

        if (await perror) {
            console.log(perror.message);
        }
        else if (await !perror) {
            navigate('/', { replace: true })
        }

    }
    return (
        <div className="container flex flex-col items-center justify-center my-4">
            <div className="heading">
                <h1 className="text-2xl text-cyan-600 py-2">
                    New Post
                </h1>
            </div>
            <form className=" flex flex-col" onSubmit={postData}>
                <h2>Title</h2>
                <input className="border-2 border-gray-400 rounded"  type="text" name="post-title" ref={postTitleRef} />
                <h2>Body</h2>
                <textarea className="border-2 border-gray-400 rounded"  type="text" name="post-body" id="post-body" ref={postBodyRef} rows="8" cols="30"  />
                <button className="py-2 px-2 bg-blue-400 rounded my-2" >Post</button>
            </form>
        </div>
    )
}

export default NewPost