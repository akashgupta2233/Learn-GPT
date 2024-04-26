import jwt from 'jsonwebtoken';
import { COOKIE_NAME } from "./constants.js";
export const createToken = (id, email, expiresIn) => {
    const token = jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn });
    return token;
};
export const verifytoken = async (req, res, next) => {
    const token = req.signedCookies[`${COOKIE_NAME}`];
    if (!token || token.trim() === "") {
        return res.status(401).json({ message: "Token Not Received" });
    }
    //console.log(token);
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
            if (err) {
                reject(err.message);
                return res.status(401).json({ message: "Token Expired" });
            }
            else {
                console.log("Token Verification Successful");
                resolve();
                res.locals.jwtData = success;
                return next();
            }
        });
    });
};
//# sourceMappingURL=jwt-token-generator.js.map