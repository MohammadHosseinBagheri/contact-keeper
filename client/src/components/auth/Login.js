import React , {useState , useContext , useEffect} from 'react'
import AuthContext from '../../Context/auth/authContext'
import AlertContext from '../../Context/alert/alertContext'

const Login = (props) => {

    const alertContext = useContext(AlertContext)
    const authContext = useContext(AuthContext)

    const {setAlert} = alertContext
    const {login , error , clearErrors , isAuthenticated} = authContext

    useEffect(()=>{
        if(isAuthenticated) {
            props.history.push('/')
        }
        if(error === 'User with this Email doesnt exist') {
            setAlert(error , 'danger')
            clearErrors()
        }

        // eslint-disable-next-line
    } , [error , isAuthenticated , props.history])

    const [user , setUser] = useState({
        email:'',
        password:''
    })

    const { email , password} = user


    const onChange = e => {
        setUser({...user , [e.target.name]:e.target.vlaue})
    }

    const onSubmit = e => {
        e.preventDefault()
        if(email === '' || password === '' ) {
            setAlert('Please fill all fields' , 'danger')
        } else {
            login({
                email ,
                password
            })
        }
    }

    return (
        <div className = 'form-container'>
            <h1>
                Account <span className='text-primary'> Login </span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor='email'>Email Address</label>
                    <input 
                        type='email' 
                        name='email' 
                        vlaue={email} 
                        onChange={onChange} 
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input 
                        type='password' 
                        name='password' 
                        vlaue={password} 
                        onChange={onChange} 
                    />
                </div>
                <input 
                    type='submit' 
                    vlaue="Login" 
                    className='btn btn-primary btn-block'
                />
            </form>
            
        </div>
    )
}

export default Login
