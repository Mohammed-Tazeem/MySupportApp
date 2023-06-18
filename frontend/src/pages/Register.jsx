import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { FaUser } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useSelector,useDispatch } from 'react-redux'
import { register,reset } from '../features/auth/authSlice'
import Spinner from '../Components/Spinner'


function Register() {

    const navigate = useNavigate()

    const [formData,setFormData] = useState({
        name:'',
        email:'',
        password:'',
        password2:''
    })

    const{name,email,password,password2} = formData

    const dispatch = useDispatch()

    const {user,isLoading,isSuccess, message,isError} =
     useSelector(
        (state) =>state.auth 
      )

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


    const onChange = (e) =>{
        setFormData((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }

    const onSubmit =(e)=>{
        e.preventDefault()


        if(password !== password2){
            toast.error('Passwords Do Not Match')
        }else{
            const userData = {
                name,
                email,
                password
            }
            dispatch(register(userData))
        }
    }

    if(isLoading){
        return (
            <Spinner/>
        )
    }

  return (
    <>
    <section className='heading'>
        <h1>
            <FaUser/> Register 
        </h1>
        <p>
            Please Create an Account
        </p>

    </section>
    <section className='form'>
    <form onSubmit={onSubmit}>
        <div className='form-group'>
            <input 
                className='form-control' 
                type='text' 
                id='name' 
                value={name} 
                name='name'
                onChange={onChange}
                placeholder='Enter Your Name'
                required
                />
        </div>
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
            <input 
                className='form-control' 
                type='password' 
                id='password2' 
                value={password2} 
                name='password2'
                onChange={onChange}
                placeholder='Confirm Your Password'
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

export default Register