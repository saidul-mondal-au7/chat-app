const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type:String,
    required:true,
    trim:true,
  },
  email: {
    type:String,
    required:true,
    unique:true,
    trim:true,
    lowercase:true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error('Email is invalid!')
      }
    }
  },
  mobile: {
    type: Number,
    // required: true
  },
  password: {
    type:String,
    required:true,
    trim:true,
    minlength:6,
    validate(value){
      if(value.toLowerCase().includes('password')){
        throw new Error('Password cannot contain "password"')
      }
    }
  },
  avatar: {
    type: Buffer
  }
},{
  timestamps:true
});

UserSchema.pre('save', async function(next){
  const user = this

  if(user.isDirectModified('password')){
      user.password = await bcrypt.hash(user.password,8)
  }
  next()
})

const User = mongoose.model('User', UserSchema);

// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(User.password, salt, async(err, hash) => {
//   if (err) throw err;
//   User.password = hash;
//   })
// }),

module.exports = User;
