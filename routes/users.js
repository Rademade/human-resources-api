import express from 'express';
import UsersController from "../controllers/UsersController";
import verifyToken  from "./verify-token";

const router  = express.Router();

router.get('/users', verifyToken, UsersController.index);
router.post('/users', verifyToken,UsersController.create);
router.delete('/users/:id',verifyToken, UsersController.destroy);

module.exports = router;
