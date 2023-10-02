const router = require("express").Router();

router.get('/',function(req,res){
    res.render('order')
})

let order_ar=[]


router.post('/',function(req,res){
    if(req.isAuthenticated()){
        cart_ar.forEach(function(cart){
            order_ar.push(cart)
        })
        const neworder=new Order({
            Firstname:req.body.fname,
            Lastname:req.body.lname,
            phonenum:req.body.phnum,
            adress:req.body.adress,
        })
    
        neworder.save(function(err){
            if(err){
                console.log(err)
            }else{
                req.flash('message', 'order placed Successfully');
                cart_ar=[]
                total_price=0
                res.redirect('/')
            }
        })
    }else{
        res.redirect('/register')
    }
})

router.get('/all_orders',function(req,res){
    // res.render('all_orders',{orders:order_ar})
    console.log(order_ar);
})


module.exports = router