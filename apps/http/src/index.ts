import * as express from "express"
import { prismaClient } from "db/client"
import * as jwt from "jsonwebtoken"
import cors from "cors";

const app = express.default();

app.use(express.default());
app.use(cors());

app.post('/signup', async (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = await prismaClient.user.create({
        data: {
            username: username,
            password: password
        }
    })
    res.json({
        userId: user.id
    }) 
})

app.post('signin', async (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = await prismaClient.user.findFirst({
        where: {
        username: username 
        }
    })
    if(!user){
        console.log("no user found");
        return;
    }
    const userId = user.id;
    const JWT_SECRET = process.env.JWT_SECRET!;
    const token = jwt.sign(userId, JWT_SECRET);

    res.json({
        token
    }) 
});




app.listen(3001);