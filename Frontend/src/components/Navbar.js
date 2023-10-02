import '../assets/nav.css'
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Cart from './Cart';
function UpNav({cart,total}) {
  const notify = () => toast("Logged Out");
  const [sideBar, setsideBar] = useState(false)
  const [loggedin, setloggedin] = useState(false)
  const [shopCart, setshopCart] = useState(cart)
  const [sum, setTotal] = useState(total)
  

  const Logout = async () =>{
    try{
      const response = await fetch('http://localhost:4000/auth/logout',{
        method:"GET"
      })
      console.log(response);
      notify()
      const timer = setTimeout(() => {
          localStorage.removeItem("user")
          localStorage.removeItem("cart")
          window.location.href="/"
      }, 500);
    }catch(err){
      console.log(err.message);
    }
  }

  const openNav = () => {
    setsideBar(true)
    //console.log(cart);
  }

  const closeNav = () =>{
    setsideBar(false)
  }


  
  // function closeNav() {
  //   document.getElementById("mySidenav").style.width = "0";
  // }

  return (
    <>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
  <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="/">
      <h2>Wrap-n-Go</h2>
    </a>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          

        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="Register" style={{color:"black"}}>
            Register/Login
          </a>
        </li>
        {/* <li className="nav-item">
          <a className="nav-link" href="/" style={{color:"black"}}>
            Cart
          </a>
        </li> */}
        <li className="nav-item dropdown">
          <a
            style={{color:"black"}}
            className="nav-link dropdown-toggle"
            href="/"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Profile
          </a>
          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item" href="/">
                Orders
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="/">
                Subscription
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item" onClick={Logout}>
                Logout
              </a>
            </li>
          </ul>
        </li>
      </ul>
      <form className="d-flex" role="search" style={{marginRight:"2%"}}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
      <a className="nav-link cart" style={{color:"black",marginRight:"2%",cursor:"pointer"}} onClick={openNav}>
            Cart
      </a>
    </div>
    {
      sideBar ? (
        <div id="mySidenav" className="sidenav">
          <a  className="closebtn" onClick={closeNav}>&times;</a>
          {/* <h1 style={{color:'whitesmoke'}}>hello</h1> */}
          <div>{
          shopCart ? (
            <Cart cart = {cart} total= {total} />
          ) 
          :(<h1 style={{color:'whitesmoke',fontSize:"100px"}}>Nope</h1>)
          
        }</div>
          
        </div>
      ) : (<div></div>)
    }
      
  </div>
</nav>

</>
  );
}

export default UpNav;