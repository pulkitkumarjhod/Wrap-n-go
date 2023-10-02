const router = require("express").Router();

router.get('/',function(req,res){
    let cart_ar=[]
    let total_price=0
    
    ses=req.session.cart
    if(ses){
        let keyss=Object.keys(req.session.cart.items)
        keyss.forEach(function(key){
            cart_ar.push([ses.items[key].item.name,ses.items[key].item.price,ses.items[key].item.img,ses.items[key].qty])
        })


        for(let i=0; i<cart_ar.length;i++){
            total_price+=cart_ar[i][1]*cart_ar[i][3]
        }

        console.log(cart_ar);
        res.render('cart',{carts:cart_ar,totalPrice:total_price})
        
        // console.log(req.session.cart);
    }else{
        let noprod="No products found"
        res.render('cart',{carts:cart_ar,noprod:noprod,totalPrice:total_price})
    }
})

module.exports = router