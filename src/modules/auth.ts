import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const comparePassword = async (password: string, hash: string) => {
    return await bcrypt.compare(password, hash);
}

export const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, 5);
}

export const createToken = (user: any) => {
    const token = jwt.sign(
        {
            id: user.id,
            username: user.username,
        }
        ,process.env.JWT_SECRET as string,
    );
    return token;
}

// middleware to protect routes

export const protect = (req: any, res: any, next: any) => {
    const bearer = req.headers.authorization;

    if(!bearer){
        res.status(401).json({message: 'not authorized'});
        return
    }

    const [, token] = bearer.split(' ');
    if(!token){
        res.status(401).json({message: 'not a valid token'});
        return
    }

    try{
        //If the verification is successful, the verify function will return the decoded payload of the JWT. This payload typically contains information about the user or any other relevant data associated with the token.
        const user = jwt.verify(token, process.env.JWT_SECRET as string);
        req.user = user;
        next();
    }catch(err){
        console.error(err);
        res.status(401).json({message: 'not authorized'});
    }
}