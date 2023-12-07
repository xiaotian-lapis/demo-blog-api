import express from 'express';
import {Blog} from "./models/blog.model";
import {simulateDatabaseIO} from "./utils/dbIOSimulation.util";

const app = express();
const port = 3000;

const cors = require('cors')

// Example data
export const BLOG_DATA : Blog[] = [
    {
        id: '1',
        title: 'First Blog',
        content: 'This is my first blog',
        description: 'This is my first blog',
        author: 'Anonymous',
        createdTime: new Date(),
        updatedTime: new Date(),
    },
    {
        id: '2',
        title: 'Second Blog',
        content: 'This is my second blog',
        description: 'This is my second blog',
        author: 'Anonymous',
        createdTime: new Date(),
        updatedTime: new Date(),
    },
];

app.use(cors())

app.get('/', (req, res) => {
    res.json(
        {
            message: 'Run!'
        }
    );
});

app.get('/api/blogs', async (req, res) => {
    try {

        // simulated database IO with delay and some time error
        const data = await simulateDatabaseIO(BLOG_DATA);
        res.json(data);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error.message);
        } else {
            res.status(500).send("unknown error");
        }

    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
