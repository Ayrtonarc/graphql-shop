import enviroment  from "./enviroments";

if(process.env.NODE_ENV !== 'production'){
    const env = enviroment;
}

export const SECRET_KEY = process.env.SECRET || 'Militarencrypted'

export enum COLLECTIONS {
    USERS='users'
}

export enum MESSAGES {
   TOKEN_VERIFICATION_FAILED = 'token no valido'
}