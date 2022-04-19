const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('card', { prompt:" Who is my dad?", hint:"Siam"});
});

module.exports = router;