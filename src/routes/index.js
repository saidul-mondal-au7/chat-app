const express = require('express');
const path = require('path')
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../middleware/auth');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);

// Chat room
router.get('/chat.html', ensureAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/chat.html'));
});


module.exports = router;
