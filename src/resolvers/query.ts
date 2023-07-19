import { IResolvers } from 'graphql-tools';
import { COLLECTIONS, EXPIRETIME } from '../config/constants';
import JWT from '../lib/jwt';
import bcrypt, { hash } from 'bcrypt';

const resolversQuery: IResolvers = {
    Query: {
        async users(_, __, { db },) {
            try {
                return {
                    status: true,
                    message: 'lista de usuarios cargada correctamente',
                    users: await db.collection(COLLECTIONS.USERS).
                    find().toArray()
                };
            } catch (error) {
                console.log(error);
                return {
                    status: false,
                    message: 'Error al cargar los usuarios',
                    users: []
                };
            }

        },
        async login(_, { email, password}, { db } ){
            try {
                const user = await db
                .collection(COLLECTIONS.USERS).
                findOne({email});

                if(user === null) {
                    return {
                        status: false,
                        message: 'Usuario no existe',
                        token: null,
                    };
                }
                const passwordCheck = bcrypt.compareSync(password, user.password);

                    if(passwordCheck !== null){
                        delete user.password;
                        delete user.birthday;
                        delete user.registerDate;
                    }
                return {
                    status: true,
                    message:
                        !passwordCheck
                            ? 'password o correo no correctos'
                            : 'Usuario cargado correctamente',
                    token:
                        !passwordCheck
                            ? null
                            : new JWT().sign({ user }, EXPIRETIME.H24),
                };

            } catch (error) {
                console.log(error);
                return {
                    status: false,
                    message: 'Error al cargar el usuario',
                    token: null,
                };
            }
        },
        me(_,__,{token}){
            return; 
        }
    }
};

export default resolversQuery;