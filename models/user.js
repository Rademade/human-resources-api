import Sequelize from 'sequelize';
import sequalize from '../config/db';

let User = sequalize.define('User', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    // password: {
    //     type: Sequelize.STRING,
    //     allowNull: false
    // }
}, {
    instanceMethods: {
    }
});

User.sync();

export default User;