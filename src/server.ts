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
        author: 'John Wick',
        createdTime: new Date(),
        updatedTime: new Date(),
        location: {
            lat: -37.80984736554404,
            lng: 144.96339022413397,
            addr: '211 La Trobe St, Melbourne VIC 3000'
        },
    },
    {
        id: '2',
        title: 'Second Blog',
        content: 'This is my second blog',
        description: 'This is my second blog',
        author: 'John Doe',
        createdTime: new Date(),
        updatedTime: new Date(),
        location: {
            lat: -37.8115090940683,
            lng: 144.96377748262293,
            addr: '300 Lonsdale St, Melbourne VIC 3000'
        },
    },
    {
        id: '3',
        title: 'Third Blog',
        content: 'This is my third blog',
        description: 'This is my third blog',
        author: 'Harry Potter',
        createdTime: new Date(),
        updatedTime: new Date(),
        location: {
            lat: -37.799872325077274,
            lng: 144.96440840984917,
            addr: '700 Swanston St, Carlton VIC 3053'
        },
    }
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
