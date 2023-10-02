import { useState } from 'react';
import '../assets/cart.css'



const Cart = ({cart,total})=>{
const [shopCart,setshopCart] = useState(cart)
console.log('cart',shopCart);

return(
    <div style={{width:'90%'}}>
        <h1 className='head'>Cart</h1>
        {
            shopCart? (
                <>
                <div>
                    {Object.keys(shopCart).map(key => (
                    <div className='orders' key={key}>
                        <div className='small-card'>
                            <img src={`./food/${shopCart[key]['img']}.jpg`}></img>
                            <p>{key.toUpperCase()}</p>
                            <p style={{ color: 'whitesmoke' }}>{shopCart[key]['price']}</p>
                            <p style={{ color: 'whitesmoke' }}>{shopCart[key]['quantity']}</p>
                        </div>
                    </div>
                    ))}
                </div>
                <div className='total'>
                    <p>Total Amout = Rs.{total}/-</p>
                    <button>
                        <a href="Orders">
                            Order your Meal
                        </a>
                    </button>                
                </div>
                </>
            ) : (<h1 style={{color:'whitesmoke'}}>Cart is Empty</h1>)
        }
        

    </div>
)
}

export default Cart;