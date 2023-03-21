import { useContext } from 'react'
import Login from '../components/auth/Login'
import AuthStatusContext from '../store/AuthContext'
import { Link, useNavigate } from 'react-router-dom';

const Authentication = (props) => {
    const navigate = useNavigate();
    const AuthCtx = useContext(AuthStatusContext);
    if(AuthCtx.isActive !== 0){
        navigate('/',{ replace : true })
    }
    if (AuthCtx.isActive === 0) {
        return (
            <div className='flex md:flex-row flex-col justify-center items-center w-full'>
                <div className='px-4 flex flex-col items-center justify-center'>
                    <Login />
                    <span>Not an User ?? <Link className='text-blue-500' to={'/signup'}>Register</Link> </span>
                </div>
            </div>
        )
    }

    return (
        <div className='flex flex-row w-5/12'>
        </div>
    )
}

export default Authentication