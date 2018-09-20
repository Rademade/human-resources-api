import User from "../models/user";
import jwt from 'jsonwebtoken';

class UsersController {

    static index(req, res) {
      jwt.verify(req.token, 'secretKey', (err, authData) => {
        if (err) {
          res.sendStatus(401);
        } else {
          User.findAll({
            attributes: ['id','firstName', 'lastName', 'email', 'createdAt', 'updatedAt']
          }).then(data => {
            res.json({
              data,
              authData
            })
          });
        }
      })

    };

    static create(req) {
        User.findOrCreate({where: {firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email}})
            .spread((user, created) => {
                console.log(user.get({plain: true}));
                console.log(created)
            })
    };

    static destroy(req,res) {
        User.destroy({
            where: {
                id: req.body.id
            }
        }).then(data => res.json(data));
    };
}

export default UsersController;
