import '../assets/register.css'
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () =>{

    const [inputs, setInputs] = useState({
        username: "",
        password: "",
      });

    const { username, password } = inputs;

    const onChange = (e) =>
      setInputs({ ...inputs, [e.target.name]: e.target.value });

    const notify = () => toast("Logged In!");
  
    
    const handlesubmission = async (e) =>{
        e.preventDefault()
        try{
            const body = JSON.stringify({ username, password })
            console.log(body);
            const response = await fetch('http://localhost:4000/auth/login',{
            method:"POST",
            body
            })
            let login = await response.json();
            localStorage.setItem("user",login)
            localStorage.setItem("cart",JSON.stringify({"dish":{"price":0,"quantity":0}}))
            notify()
            const timer = setTimeout(() => {
                window.location.href="/"
              }, 1500);
            // window.location.href="/"
            console.log(login);
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
                        <p style={{marginRight:"10px"}}>Not Registered? </p>
                        <a href='Register' className='loginBtn' >SignUp</a>
                    </div>
                </div>
                {/* <img src="register.jpg" alt=""  > */}
                <div className="box" >
                
                <form onSubmit={handlesubmission} className='form'>
                    <h1 style={{ color: "black" }}>LOGIN</h1>
                    <div className="form-group">
                    {/* <label for="email">Email</label> */}
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
                    {/* <label for="password">Password</label> */}
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={password}
                        onChange={(e) => onChange(e)}
                        placeholder="Password"
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

export default Login;