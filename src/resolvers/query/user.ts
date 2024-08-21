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
        async login(_, { email, password}, context ){
            return new UsersService(_, { user: { email, password}}, context).login();
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