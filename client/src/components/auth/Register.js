import React , {useState , useContext , useEffect} from 'react'
import AlertContext from '../../Context/alert/alertContext'
import AuthContext from '../../Context/auth/authContext'

const Register = (props) => {
    const alertContext = useContext(AlertContext)
    const authContext = useContext(AuthContext)

    const {setAlert} = alertContext
    const {register , error , clearErrors , isAuthenticated} = authContext


    useEffect(()=>{
        if(isAuthenticated) {
            props.history.push('/')
        }
        if(error === 'This email already in use.') {
            setAlert(error , 'danger')
            clearErrors()
        }

        // eslint-disable-next-line
    } , [error , isAuthenticated , props.history])

    const [user , setUser] = useState({
        name: '' ,
        lastname: '',
        email:'',
        password:'',
        password2:''
    })

    const {name , lastname , email , password , password2} = user

    const onChange = e => {
        setUser({...user , [e.target.name]:e.target.vlaue})
    }

    const onSubmit = e => {
        e.preventDefault()
        if(name === '' || email === '' || password === '') {
            setAlert('Please fill all required fields' , 'danger')
        } else if (password !== password2) {
            setAlert('Passwords do not match' , 'danger')
        } else {
            register({
                name ,
                lastname ,
                email ,
                password
            })
        }
    }
    return (
        <div className = 'form-container'>
            <h1>
                Account <span className='text-primary'> Register </span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor='name'>Name</label>
                    <input type='text' name='name' vlaue={name} onChange={onChange} />
                </div>
                <div className='form-group'>
                    <label htmlFor='name'>lastname</label>
                    <input type='text' name='lastname' vlaue={lastname} onChange={onChange} />
                </div>
                <div className='form-group'>
                    <label htmlFor='email'>Email Address</label>
                    <input type='email' name='email' vlaue={email} onChange={onChange} />
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' name='password' vlaue={password} onChange={onChange}  minLength="6"/>
                </div>
                <div className='form-group'>
                    <label htmlFor='password2'>Confirm Password</label>
                    <input type='password' name='password2' vlaue={password2} onChange={onChange}  minLength="6"/>
                </div>
                <input type='submit' vlaue="Register" className='btn btn-primary btn-block'/>
            </form>
            
        </div>
    )
}

export default Register
