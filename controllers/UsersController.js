import User from "../models/user";

class UsersController {

    static index(req, res) {
        User.findAll({
             attributes: ['id','firstName', 'lastName', 'email', 'createdAt', 'updatedAt']
         }).then(data => res.json(data));
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
