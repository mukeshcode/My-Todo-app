const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();

const app = express();
const port = process.env.PORT || 3003;
const mongoURL = process.env.MONGO_URL;

app.set('port', port);
app.use(express.json());

mongoose.connect(mongoURL);

const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    completed: { type: Boolean, default: false },
});

const Todo = mongoose.model('Todo', todoSchema);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.use((req, res, next) => {
    console.log('Method:', req.method, 'URL:', req.url);
    next();
})

app.use(express.static(path.join(__dirname, '../build')));

// Create a new todo
app.post('/todos', async (req, res) => {
    try {
        const newTodo = await Todo.create(req.body);
        res.status(201).json(newTodo);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error creating todo' });
    }
});

// Get all todos
app.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching todos' });
    }
});

// Update a todo
app.put('/todos/:id', async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedTodo);
    } catch (error) {
        res.status(500).json({ error: 'Error updating todo' });
    }
});

// Delete a todo
app.delete('/todos/:id', async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting todo' });
    }
});

app.listen(port, () => {
    console.log(`App is listing on port: ${port}`);
})