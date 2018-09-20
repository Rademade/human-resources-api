import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import usersController from '../controllers/UsersController';
const router  = express.Router();

router.post('/auth', async (req,res) => {
  try {
    const user = await usersController.findUser(req.body.email);
    const password = bcrypt.compareSync(req.body.password, user.password);
    if (password) {
      jwt.sign({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      },'secretKey', {expiresIn: '1d'}, (err,token) => {
        res.json({
          token
        })
      });
    } else {
      res.status(400).send('Fill password')
    }
  } catch (e) {
    res.status(400).send('Please fill email and password')
  }

});

module.exports = router;
