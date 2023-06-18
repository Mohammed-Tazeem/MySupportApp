import React,{useState,useEffect} from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useNavigate, } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector,useDispatch } from 'react-redux'
import { login,reset } from '../features/auth/authSlice'
import Spinner from '../Components/Spinner'


function Login() {
    const [formData,setFormData] = useState({
        
        email:'',
        password:'',
        
    })

    const{email,password} = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {user,isLoading,isSuccess,isError, message} =
     useSelector(
        (state) =>state.auth 
      )

    const onChange = (e) =>{
        setFormData((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }

    const onSubmit = (e)=>{
      e.preventDefault()

      const userData = {
        email,
        password
      }
      dispatch(login(userData))
    }

    useEffect(()=>{
        if(isError){
            toast.error(message)
        }

        // Redirect When logged In
        if(isSuccess || user){
            navigate('/')
        }

        dispatch(reset())

    },[isError,isSuccess,user,message,navigate,dispatch])
    

    if(isLoading){
        return(<Spinner/>)
    }

  return (
    <>
    <section className='heading'>
        <h1>
            <FaSignInAlt/> Login
        </h1>
        <p>
            Login into your Account
        </p>

    </section>
    <section className='form'>
    <form onSubmit={onSubmit}>
        
        <div className='form-group'>
            <input 
                className='form-control' 
                type='email' 
                id='email' 
                value={email} 
                name='email'
                onChange={onChange}
                placeholder='Enter Your Email'
                required
                />
        </div>
        <div className='form-group'>
            <input 
                className='form-control' 
                type='password' 
                id='password' 
                value={password} 
                name='password'
                onChange={onChange}
                placeholder='Enter Your password'
                required
                />
        </div>
        <div className='form-group'>
            <button className='btn btn-block'>
                Submit
            </button>
        </div>
    </form>
    </section>
    
    </>
  )
}

export default Login