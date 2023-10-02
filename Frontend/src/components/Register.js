import '../assets/register.css'
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () =>{
    //Storing All the inputs
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
        retype:""
      });

    const { username, password, retype } = inputs;

    const onChange = (e) =>
      setInputs({ ...inputs, [e.target.name]: e.target.value });
    
    //notify function for toast message
    const notify = (message) => toast(message);
    
    //Posting all the user details to the Backend
    const handlesubmission = async (e) =>{
        e.preventDefault()
        try{
            if(password !== retype){
                let message = "Password Dosen't match"
                notify(message)
            }else{
                const body = JSON.stringify({ username, password })
                const response = await fetch('http://localhost:4000/auth/register',{
                method:"POST",
                body
                })
                let register = await response.json();
                if(register.message === "200"){
                    let message = "You are Now Registered"
                    notify(message)
                    let timer = setTimeout(() => {
                        window.location.href="/"
                    }, 1500);
                }else{
                    let message = "User already Exists"
                    notify(message)
                }
            }
            
        }catch(err){
          console.log(err.message);
        }
      }

    return (
        <>
 
            <div >
                <ToastContainer/>
                <div className='Nav' style={{display:'flex',justifyContent:"space-between"}}>
                    <a href='/' style={{marginTop:"5vh",marginLeft: "3vw"}}><h2>Wrap-N-Go</h2></a>
                    <div className='signIn' style={{display:"flex",float:'right',marginTop:"5vh",marginRight: "5vw"}}>
                        <p style={{marginRight:"10px"}}>Already Registered? </p>
                        <a href='Login' className='loginBtn' >Login</a>
                    </div>
                </div>
                {/* <img src="register.jpg" alt=""  > */}
                <div className="box" >
                
                <form onSubmit={handlesubmission} className='form'>
                    <h1 style={{ color: "black" }}>Register</h1>
                    <div className="form-group">
            
                    <input
                        type="email"
                        className="form-control"
                        name="username"
                        value={username}
                        onChange={(e) => onChange(e)}
                        placeholder="E-mail"
                    />
                    </div>
                    <br />
                    <div className="form-group">
                    
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={password}
                        onChange={(e) => onChange(e)}
                        placeholder="Password"
                    />
                    </div>
                    <br />
                    <div className="form-group">
                    
                    <input
                        type="password"
                        className="form-control"
                        name="retype"
                        value={retype}
                        onChange={(e) => onChange(e)}
                        placeholder="Retype Password"
                    />
                    </div>
                    <button type="submit" className="btn1">
                    Login
                    </button>
                </form>
                </div>
            </div>
</>

    )
}

export default Register;