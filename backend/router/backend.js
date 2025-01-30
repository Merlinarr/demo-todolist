const express = require("express");
const router = express.Router();
const backend_handler = require("../router_handler/backend");
const expressJoi = require("@escook/express-joi");
const { 
  reg_login_schema, 
  create_todo_schema,
  update_todo_schema,
  delete_todo_schema
} = require("../schema/backend");

// Auth routes
router.post("/auth/signup", expressJoi(reg_login_schema), backend_handler.signup);
router.post("/auth/signin", expressJoi(reg_login_schema), backend_handler.signin);

// Todo routes - protected by JWT
router.get("/tasks", backend_handler.getTodos);
router.post("/tasks", expressJoi(create_todo_schema), backend_handler.createTodo);
router.patch("/tasks/:id", expressJoi(update_todo_schema), backend_handler.updateTodo);
router.delete("/tasks/:id", expressJoi(delete_todo_schema), backend_handler.deleteTodo);

module.exports = router;
