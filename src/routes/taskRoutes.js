import express from 'express';
import {createTask, getTasks, updateTask, deleteTask} from '../controllers/taskController.js';
import { protect } from '../middleware/auth.js';
import { validate, taskSchema, updateTaskSchema } from '../middleware/validation.js';

const taskrouter = express.Router();
taskrouter.use(protect); //protect all task routes

taskrouter.get('/', getTasks);
taskrouter.post('/', validate(taskSchema), createTask);
taskrouter.put('/:id', validate(updateTaskSchema), updateTask);
taskrouter.delete('/:id', deleteTask);
export default taskrouter;