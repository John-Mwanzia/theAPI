import prisma from "../db"
import { comparePassword, createToken, hashPassword } from "../modules/auth"

export const createNewUser = async (req, res) => {
    const user =  await prisma.user.create({
        data:{
            userName: req.body.username,
            password: await hashPassword(req.body.password),
        }
    })
    
    const token = createToken(user);
    res.json({token});
}


export const signIn = async (req, res) => {
    const user = await prisma.user.findUnique({
        where:{
            userName: req.body.username,
        }
    })

    const isValid = await comparePassword(req.body.password, user.password);
    if(!isValid){
        res.status(401).json({message: 'not authorized'});
        return
    }
    const token = createToken(user);
    res.json({token});
}