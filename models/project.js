import Sequelize from 'sequelize'
import sequalize from '../config/db'

let Project = sequalize.define('Project', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    color: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}, {
    instanceMethods: {
    }
});

Project.sync();

export default Project;
