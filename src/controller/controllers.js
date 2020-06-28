
const User = require('../models/User');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const {sendWelcomeMail,sendGoodbyMail} = require('../emails/account');

const userControll = {
    signup: async( req, res ) => {
        const { name, email, mobile, password, password2 } = req.body;
        let errors = [];
      
        if (password != password2) {
          errors.push({ msg: 'Passwords do not match' });
        }
      
        if (errors.length > 0) {
          res.render('signup', { errors, name, email, mobile, password, password2 });
        } else {
          const user = await User.findOne({ email: email })

          try {
            if (user) {
              errors.push({ msg: 'Email already exists' });
              res.render('signup', { errors, name, email, mobile, password,password2 });

            } else {
              const user = new User({ name, email, mobile, password })
              await user.save()
              req.flash('success_msg', 'You are now registered and can log in');
              sendWelcomeMail(user.email, user.name)
              res.status(201).redirect('/users/login');
            }
          } catch(e) {
            res.status(400).send(e)
          }
        }  
    },
    login: async(req,res,next) => {
        try {
            await passport.authenticate('local', {
                successRedirect: '/dashboard',
                failureRedirect: '/users/login',
                failureFlash: true,
              })(req,res,next);
        } catch (e) {
            res.status(400).send(e)
        }
       
    },
    readImage: async(req,res) => {
      try{
        const user = await req.user
        if(!user || !user.avatar){
            throw new Error()
        }
        res.set('Content-Type','image/png')
        res.send(user.avatar)
      }catch(e){
        res.sendStatus(404).send()
      }
    },
    logout: async(req,res) => {
        try {
            await req.logout();
            req.flash('success_msg', 'You are logged out');
            res.redirect('/users/login');
        } catch (e) {
            res.status(400).send(e)
        }
        
    },
    update: async(req,res) => {
        const updates = Object.keys(req.body)
        const allowedUpdate = ['name','email','mobile', 'password']
        const isValidOperation = updates.every((update)=>allowedUpdate.includes(update))

        if(!isValidOperation){
             return res.status(400).send({error:'Invalid updates!'})
        }
        try{
            updates.forEach((update)=>req.user[update]=req.body[update])
            await req.user.save()
            req.flash('success_msg', 'Your Details Have Been Updated!');
            res.redirect('/users/read')
        }catch(e){
          res.status(201).status(400).send(e)
        }
    },
    delete: async(req,res) => {
        try {
            await req.user.remove();
            req.flash('success_msg', 'You have successfully deleted your account. Signup a new account')
            sendGoodbyMail(req.user.email,req.user.name)
            res.redirect('/users/signup');
        } catch (e) {
            res.status(400).send(e)
        }
    },

    deleteImage: async(req,res) => {
      req.user.avatar = undefined
      await req.user.save()
      req.flash('success_msg', 'Your Profile Picture Is Deleted');
      res.redirect('/users/read')
    }
}

module.exports = userControll