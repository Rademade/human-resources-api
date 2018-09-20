import User from "../models/user";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

class UsersController {

  index(req, res) {
    jwt.verify(req.token, 'secretKey', (err, authData) => {
      if (err) {
        res.sendStatus(401);
      } else {
        User.findAll({
          attributes: ['id', 'firstName', 'lastName', 'email', 'createdAt', 'updatedAt']
        }).then(data => {
          res.json({
            data,
            authData
          })
        });
      }
    })

  };

  create(req, res) {
    if (req.body.firstName && req.body.lastName && req.body.email && req.body.password) {
      User.findOrCreate({ where: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 10)
        }}).spread((user, created) => {
        if (created) {
          console.log(user);
          res.json(user)
        } else {
          res.status(400).send({error: 'User Already exist'})
        }
      })
    } else {
      res.status(400).send({error: 'Fill fields'})
    }
  };

  destroy(req, res) {
    User.destroy({
      where: {
        id: req.body.id
      }
    }).then(data => res.json(data));
  };

  findUser(email) {
    return User.findOne({
      where: {
        email: email
      },
      attributes: ['email','firstName','lastName','password',]
    }).then((user) => {
      return user.dataValues;
    }).catch((error) => {
      return error;
    })
  };
}

export default new UsersController();
