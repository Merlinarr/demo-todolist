const joi = require("joi");

// Auth validation
const email = joi.string().email().required();
const password = joi.string().min(3).required();

// Todo validation
const title = joi.string().required();
const completed = joi.boolean();
const todoId = joi.string().required();

exports.reg_login_schema = {
    body: {
        email,
        password,
    },
};

exports.create_todo_schema = {
    body: {
        title,
        completed
    },
};

exports.update_todo_schema = {
    params: {
        id: todoId
    },
    body: {
        title: joi.string(),
        completed: joi.boolean()
    },
};

exports.delete_todo_schema = {
    params: {
        id: todoId
    },
};