const router = require("express").Router()

const {userController} = require("../controllers");
const {userMiddleware} = require("../middleware/user.middleware");

router.get('/', userController.findAll);
router.post('/', userMiddleware.checkUserOnCreate, userController.create)

router.get('/:userId',userController.findById);
router.put('/:userId',userController.updateById);
router.delete('/:userId',userController.deleteById);

module.exports = router;