//import './App.css';
import './assets/home.css'
import UpNav from './components/Navbar';
import { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {
  const [dishes,setDishes] = useState({})
  const [cart, setCart] = useState({})
  const [total, setTotal] = useState(0)
  const inputRef = useRef(null);

  const getDishes = async () =>{
    try{
      const response = await fetch('http://localhost:4000/getDish',{
        method:"GET"
      })
      let Dishes = await response.json();
      setDishes(Dishes)
    }catch(err){
      console.log(err.message);
    }
  }

  const Add = (img,name,price) =>{
    // if(!localStorage.getItem("user")){
    //   toast("Please login to add it to cart!");
    //   return
    // }
    // setCart([JSON.parse(localStorage.getItem("cart"))])
    var present = false
    cart.length!==0 && Object.keys(cart).map((item,index)=>{
      if(item === name){
        cart[item].quantity += 1
        cart[item]['price'] += price
        setTotal(total + price)
        present = true
        localStorage.setItem("cart",JSON.stringify(cart))
        localStorage.setItem('total', total  + price)
      }
    })   
    if (present === false){
      //console.log('y',name);
      cart[name] = {img,price,quantity:1}
      setTotal(total + price)
      localStorage.setItem("cart",JSON.stringify(cart))
      localStorage.setItem('total', total + price)
    } 
  
  }

  const val = () =>{
    console.log("inputref:",inputRef);
}


  useEffect(()=>{
    getDishes()
  },[])

  return (
      <div>
    
        <UpNav cart = {cart} total = {total} />
        
        <div className="cont">
          <div className="inner_cont">
            <div className="text" style={{ marginRight: 100 }}>
              <p style={{ fontSize: 25 }}> Order At Your Convenience </p>
              <p style={{ fontSize: 45 }}>Get At Your Footsteps</p>
            </div>
            <div className="img">
              <img
                className="header_img"
                src="header_home.png"
                alt="Tiffin service"
                style={{ maxheight: "80%" }} />
            </div>
          </div>
        </div>

        
        <div className="box1">
          <div className="card tiffin" style={{width: "40rem"}}>
            <img
              src="tiffin.jpg"
              className="card-img-top"
              alt="food" />
            <div className="card-body">
              <h5 className="card-title">Tiffin</h5>
              <p className="card-text">
                Checkout our tastiest and healthiest Tiffin menu
              </p>
              <a href="/" className="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>

          {
            Object.values(dishes).map((value,index) => {
              return(
                <div key={index}>
                  <div className="card" style={{width: "20rem", marginRight: "5px"}}>
                      <img src={`/food/${value.img}.jpg`} style={{height: "200px"}}  className="card-img-top" alt="food"></img>
                      <div className="card-body">
                        <h5 className="card-title" >{(value.name).toUpperCase()}</h5>
                        <p className="card-text" >Rs.{value.price}</p>
                        <button onClick={() => Add(value.img,value.name,value.price)} data-dish="" name="id" value=""  type="submit" className="btn btn-primary " id="add-to-cart">ADD</button>
                        {/* <div className='lower-card'>
                          <input type='number' ref={inputRef} placeholder='0' min="0" />
                          <button onClick={val} data-dish="" name="id" value=""  type="submit" className="btn btn-primary " id="add-to-cart">ADD</button>
                        </div> */}
                      </div>
                  </div>
                </div>
              )
            })
          }

        </div>
      </div>
    

  );
}

export default Home;