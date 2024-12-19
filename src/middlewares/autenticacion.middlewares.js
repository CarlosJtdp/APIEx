import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY;

const verifyToken = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "No se proporcionó token" });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Token no válido" });
        }

        req.user = decoded;  
        next();
    });
};

export { verifyToken };
