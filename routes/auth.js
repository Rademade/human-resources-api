import express from 'express';
import jwt from 'jsonwebtoken';
const router  = express.Router();

router.get('/auth', (req,res) => {
  const user = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'johnDoe@test.com',
  };
  jwt.sign({user},'secretKey', {expiresIn: '1d'}, (err,token) => {
    res.json({
      token
    })
  });
});

module.exports = router;
