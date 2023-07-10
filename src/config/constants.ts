import enviroment  from "./enviroments";

if(process.env.NODE_ENV !== 'production'){
    const env = enviroment;
}

export const SECRET_KEY = process.env.SECRET || 'Militarencrypted'