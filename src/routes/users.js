const express = require('express');
const multer = require('multer')
const sharp = require('sharp')
const router = express.Router();
const userController = require('../controller/controllers')
const { forwardAuthenticated ,ensureAuthenticated} = require('../middleware/auth');
const { authenticate } = require('passport');

// Signup Page
router.get('/signup', forwardAuthenticated, (req, res) => res.render('signup'));

// Signup
router.post('/signup', userController.signup);

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Login
router.post('/login', userController.login);

//Chat

router.get('/chat', (req,res) => res.render('start') )

// Image
router.get('/image', userController.readImage);

//Read
router.get('/read',ensureAuthenticated,(req,res) => res.render('read',{user:req.user}))

// Logout
router.get('/logout', userController.logout);

//Delete
router.get('/delete', userController.delete)

//Delete Confirmation
router.get('/deleteconf', (req,res)=> res.render('deleteconf',{user:req.user}))

//Update
router.get('/update', (req, res) => res.render('update',{user:req.user}));

router.post('/update', userController.update)

//Image upload

router.get('/avatar',ensureAuthenticated,(req,res) => res.render('avatar',{user:req.user}))

const upload = multer({
    //dest:'avatars',
    limits:{
        fileSize:10000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please upload jpg,jpeg or png file only!'))
        }
        cb(undefined,true)
    }
})

router.post('/avatar', upload.single('avatar'),async(req,res)=>{
    const buffer = await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()

    req.user.avatar = buffer
    await req.user.save()
    req.flash('success_msg', 'Your Profile Picture Is Updated');
    res.redirect('/dashboard')
},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
})

//DeleteImage
router.get('/deleteImage',userController.deleteImage)

module.exports = router;

//{"_id":{"$oid":"5eee0fd725ecb70a745e6eb7"},"name":"SAIDUL MONDAL","email":"mondalsaidul3232@gmail.com","mobile":7699368433,"avatar":{"$binary":"cGljNS5qcGc=","$type":"0"},"password":"$2a$10$jwKPbPxFuGbhUyoT.Hu5ouSE8mzyLtwUL.PjkqDp4Zc9E95.Je9tG","date":{"$date":"2020-06-20T13:32:07.315Z"},"__v":0}
