const sgMail = require('@sendgrid/mail')

 const SENDGRID_API_KEY = "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"

sgMail.setApiKey(SENDGRID_API_KEY)

const sendWelcomeMail = (email,name)=>{
    sgMail.send({
        to:email,
        from:'attainuchatapp@gmail.com',
        subject:'Thanks For Joining In!',
        text:`Welcome ${name} to AttainU Chat App. Here you can create your own chat room, where you can chat with your friends and invite your friends to join as well. Happy Chatting! AttainU Chat App Team`
    })
}

const sendGoodbyMail = (email,name)=>{
    sgMail.send({
        to:email,
        from:'attainuchatapp@gmail.com',
        subject:'Sad To See You Go!',
        text:`We were very happy togather ${name}. We are sad to see you go, please let us know what made you to leave. See You Soon! AttainU Chat App Team :)`
    })
}

module.exports = {
    sendWelcomeMail,
    sendGoodbyMail
}