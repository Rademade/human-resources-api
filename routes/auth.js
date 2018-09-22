import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import usersController from '../controllers/UsersController';
const router  = express.Router();

router.post('/auth', async (req,res) => {
  const user = await usersController.findUser(req.body.email);
  if (user) {
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
      res.status(422).send({error: 'Password Wrong'});
    }
  } else {
    res.status(422).send({error: 'User Not exist'});
  }
});

module.exports = router;
