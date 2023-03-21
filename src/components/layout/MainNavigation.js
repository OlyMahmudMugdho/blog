import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import '../../dist/output.css';
import AuthStatusContext from '../../store/AuthContext';

import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MainNavigation = () => {
    const AuthCtx = useContext(AuthStatusContext);
    const navigate = useNavigate();
    const supabaseUrl = 'https://ysyyenfpsdseakgmgeje.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzeXllbmZwc2RzZWFrZ21nZWplIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzg5NTE4NTYsImV4cCI6MTk5NDUyNzg1Nn0.GwwZPuYSF-pr6ujrjj3KDJwSV8oVJo_Hp8Rijgt1_KU';
    const supabase = createClient(supabaseUrl, supabaseKey);
    AuthCtx.checkActive();

    const [isHidden, setIsHidden] = useState(true);

    const handleClick = (event) => {
        event.preventDefault();
        if (isHidden) {
            setIsHidden(false);
        }
        else {
            setIsHidden(true);
        }
    }
    const logOut = async (event) => {
        event.preventDefault();
        await supabase.auth.signOut()
            .then(
                () => {
                    console.log("Logged Out Succesfully");
                    AuthCtx.setInactive();
                    navigate('/auth', { replace: true })
                }
            )
    }

    let content;
    if (AuthCtx.isActive === 1) {
        content =

            <div>
                <div className='py-4 bg-red-500 flex align-center items-center text-xl sm:hidden'>
                    <a href="/" className='w-full inline-block text-white px-6 h-full'>
                        <FontAwesomeIcon icon={faBars} onClick={handleClick} />
                    </a>
                </div>
                <ul className='flex sm:flex-row flex-col  justify-center items-center bg-red-500 w-full'>

                    <div className={isHidden ? 'sm:flex sm:flex-row hidden flex-col  justify-center items-center bg-red-500 wull' : 'flex md:flex-row flex-col  justify-center items-center bg-red-500'} >
                        <li className='py-4 flex align-center items-center text-xl'>
                            <Link to="/" className='w-full inline-block text-white px-6 h-full'>Home</Link>
                        </li>
                        <li className='py-4 flex align-center  items-center text-xl'>
                            <Link to="/myposts" className='w-full inline-block text-white px-6 h-full'>My Posts</Link>
                        </li>
                        <li className='py-4 flex align-center  items-center text-xl'>
                            <Link to="/new" className='w-full inline-block text-white px-6 h-full'>Create Post</Link>
                        </li>
                        <li className='py-4 flex align-center items-center text-xl'>
                            <button className='w-full inline-block text-white px-6 h-full' onClick={logOut}>Log Out</button>
                        </li>
                    </div>
                </ul>
            </div>
    }
    else {
        content = <ul className='flex justify-center items-center bg-red-500 w-full'>
            <li className='py-4 flex align-center items-center text-xl'>
                <Link to={'/auth'} className='w-full inline-block text-white px-6 h-full'>Login/SignUp</Link>
            </li>
        </ul>
    }
    return (
        <header className='block px-0 py-0 mx-0 my-0 w-full'>
            {content}
        </header>
    )
}

export default MainNavigation