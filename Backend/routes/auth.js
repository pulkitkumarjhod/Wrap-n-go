const router = require("express").Router();
const User=require('../models/user');
const passport=require('passport');

router.use(passport.initialize());
router.use(passport.session()); 

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());





router.post('/register',function(req,res){
    User.register({username:req.body.username},req.body.password,function(err,user){
        if(err){
            console.log(err);
            res.redirect('/register');
        }else if(user){
            res.status(401).json({message:"401"})
        }else{
            User.findOne({username:req.body.username},function(err,founduser){
                if(err){
                    console.log(err);
                }else{
                    if(founduser){
                        res.status(401).json({message:"401"})
                    }else{
                            passport.authenticate('local')(req,res,function(){
                            res.status(200).json({message:"200"})
                        })
                    }
                }
            }) 
        }
    })
})

// router.get('/login',function(req,res){
//     res.render('login',{message:req.flash('message')})
// })

router.post('/login',function(req,res){
    //console.log(body);
    const user=new User({
        username:req.body.username,
        password:req.body.password
    })

    req.login(user,function(err){
        if(err){
            console.log('not login');
            res.send(401)
        }else{
            passport.authenticate('local')(req,res,function(){
                req.user.password = ""
                console.log(req.user);
                res.status(200).send(req.user)
            })
        }
    })
})

router.get('/logout', function(req, res) {
    req.session.destroy(function (err) {
        res.redirect('/'); //Inside a callback… bulletproof!
      });
  });

let value=false

router.get('/update-pwd',function(req,res){
    res.render('update-pwd',{value:value,message:req.flash('message')}) 
})



//xhmmhwzvnxxromtk
router.post('/update-pwd',function(req,res){
    OT=0
    if(!value){
        var OTP=Math.floor(Math.random() * 9999) + 1000;
        OT=OTP
        var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "shukumarbham0@gmail.com",
          pass: "xhmmhwzvnxxromtk"
        }
      });
      
      message = {
        from: "shukumarbham0@gmail.com",
        to: req.body.username,
        subject: 'OTP to update password',
        text: OTP.toString()
        }
   transporter.sendMail(message, function(err, info) {
        if (err) {
          console.log(err)
          req.flash('message', err);
        } else {
          console.log(info);
          value=true
        //   console.log(OTP);
          res.render('update-pwd',{value:value,OTP:OTP.toString()})
        }
    })
    }else{
        console.log(req.body.OTP,req.body.OT);
        if (req.body.OTP==req.body.OT){
            req.flash('message', 'Correct OTP');
            res.redirect('/')
        }else{
            value=false
            res.render('update-pwd',{value:value})
        }
    }
    
    
    
    
})

module.exports = router