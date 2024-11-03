const express = require('express');
const cors = require('cors');
const port = 8080;
const app = express();

let DB = [
    {
        id: 0,
        text: 'John Doe',
        color: 1,
    },
    {
        id: 1,
        text: 'Jane Doe',
        color: 2,
    },
    {
        id: 2,
        text: 'Jane Doe',
        color: 2,
    },
    {
        id: 3,
        text: 'Jane Doe',
        color: 2,
    },
    {
        id: 4,
        text: 'Jane Doe',
        color: 2,
    },
]

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/cards', (req, res) => {
    res.json(DB);
});

app.delete('/cards/:id', (req, res) => {
    const id = req.params.id;
    DB = DB.filter(card => card.id!= id);
    res.sendStatus(204);
});

app.patch('/cards/:id', (req, res) => {
    console.log("IN PATCH!");
    const id = req.params.id;
    let card = DB.find(card => card.id == id);
    card = {
       ...card,
       ...req.body
    };
    
    DB = updateArrayAtElemntAccordingToId(DB, id, card);
    console.log(DB);
    res.json(card);
});



const updateArrayAtElemntAccordingToId = (array, id, update) => {
    return array.map(item => {
        if (item.id == id) {
            return {
                ...item,
                ...update
            };
        }
        return item;
    });
}


app.patch('/users/:id', (req, res) => {
    const id = req.params.id;
    let user = DB.find(user => user.id == id);
    user = {
        ...user,
        ...req.body
    };
    
    DB = updateArrayAtElemntAccordingToId(DB, id, user);
    console.log(DB);
    res.json(user);
});

app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    const index = DB.findIndex(user => user.id == id);
    if (index !== -1) {
        DB.splice(index, 1);
        console.log(DB);
        res.status(204).send();
    } else {
        res.status(404).send({ error: 'User not found' });
    }
});

app.post('/cards', (req, res) => {
    const user = {
        id: DB.length + 1,
        name: req.body.text,
        color: req.body.color,
    };
    DB.push(user);
    res.json(user);
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});