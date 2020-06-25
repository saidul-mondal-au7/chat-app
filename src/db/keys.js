const mongoose = require('mongoose')

//Db connection

mongoose.connect(`mongodb+srv://taskapp:`+ encodeURIComponent('said@2460') + `@cluster0-zznnv.mongodb.net/attainu-chat?retryWrites=true`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));



//connect local

// mongoose.connect('mongodb://localhost:27017/chat2', {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false
// })
// .then(() => console.log('MongoDB Connected'))
// .catch(err => console.log(err));