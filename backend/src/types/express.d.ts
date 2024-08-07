import UserAttributes from "../interface/user.interface";

declare global {
    namespace Express {
        interface Request {
            user?: UserAttributes; // Add the user property to the Request interface
        }
    }
}
