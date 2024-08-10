import { IResolvers } from 'graphql-tools';
import { COLLECTIONS, EXPIRETIME, MESSAGES } from '../../config/constants';
import JWT from '../../lib/jwt';
import bcrypt, { hash } from 'bcrypt';
import { findElements, findOneElement } from '../../lib/db-operations';
import UsersService from '../../services/user.service';

const resolversUserQuery: IResolvers = {
    Query: {
        async users(_, __, context) {
           return new UsersService(_, __, context).items();
        },
        async login(_, { email, password}, { db } ){
            try {
                
                const user = await findOneElement(db, COLLECTIONS.USERS, { email });

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
                        user
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
        me(_, __, { token }){
            console.log(token);
            let info = new JWT().verify(token);
            if(info === MESSAGES.TOKEN_VERIFICATION_FAILED) {
                return {
                    status: false,
                    message: info,
                    user: null
                };
            }
            return{
                status: true,
                message: 'Usuario autenticado mediante token',
                user: Object.values(info)[0]
            }; 
        },
        
    }
};

export default resolversUserQuery;