import '../assets/orders.css'
import { useState } from "react";
import OrderModal from './OrderModal';

const Orders = ()=>{
    const [shopCart,setshopCart] = useState(JSON.parse(localStorage.getItem('cart')))
    const total = localStorage.getItem('total')
    const [openModal, setopenModal] = useState(false)

return(
    <div>
        {Object.keys(shopCart).map(key => (
        <div className='orders' key={key}>
            <div className='small-card'>
                <img src={`./food/${shopCart[key]['img']}.jpg`}></img>
                <p style={{ color: 'black' }}>{key.toUpperCase()}</p>
                <p style={{ color: 'black' }}>{shopCart[key]['price']}</p>
                <p style={{ color: 'black' }}>{shopCart[key]['quantity']}</p>
            </div>
        </div>
        ))}
        
        
        <div className='total'>
            <h2 style={{ color: 'black' }}>Your Total: Rs.{total}/-</h2>
            <button onClick={()=>(setopenModal(true))}>
                Order Now
            </button>
        </div>
        {
            openModal ? (<OrderModal />) : (<div></div>)
        }

    </div>
)
}

export default Orders;