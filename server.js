const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.use((req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https') {
        return res.redirect('https://' + req.headers.host + req.url);
    }
    next();
});

let todos = [];

app.get('/', (req, res) => {
    res.json(todos);
});

app.post('/todo', (req, res) => {
    const todo = req.body.todo;
    todos.push(todo);
    res.status(201).json({ message: 'Item added', todo });
});

app.delete('/todo/:id', (req, res) => {
    const id = parseInt(req.params.id);
    todos = todos.filter((todo, index) => index !== id);
    res.status(200).json({ message: 'Item deleted', todos });
});

app.listen(port, () => {
    console.log(`App running at http://localhost:${port}`);
});
