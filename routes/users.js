const router = require("express").Router();

const { Create, Read, Update, Delete } = require("../controllers/users");

router.get("/user", Read);
router.post("/user", Create);
router.put("/user/:id", Update);
router.delete("/user/:id", Delete);

module.exports = router;
