import express from 'express';
import usersController from "../controllers/UsersController";
import verifyToken  from "./verify-token";

const router  = express.Router();

router.get('/users', verifyToken, function (req,res) {
  usersController.index(req,res)
});
router.post('/users', function (req,res) {
  usersController.create(req,res)
});
router.delete('/users/:id',verifyToken, function(req,res) {
  usersController.destroy(req,res);
});

module.exports = router;
