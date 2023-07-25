import { IResolvers } from 'graphql-tools';
import { COLLECTIONS } from '../../config/constants';
import bcrypt from 'bcrypt';
import { asigDocumentId, findOneElement } from '../../lib/db-operations';

const resolversUserMutation: IResolvers = {
    Mutation: {
       async register (_, { user }, { db })  {
        //comprobar que el usuario no existe
        const userCheck = await findOneElement(db, COLLECTIONS.USERS, {email: user.email});

            if(userCheck !== null){
                return {
                    status: false,
                    message: `El email ${user.email} ya esta registrado`,
                    user: null
                };
            }
        //comprobar el ultimo usuario para asignar su ID 
        user.id = await asigDocumentId(db, COLLECTIONS.USERS, { registerDate: -1});  

        //asignar fecha en formati ISO
        user.registerDate = new Date().toISOString();
        //encriptar password
        user.password = bcrypt.hashSync(user.password,10);


        return await db.
        collection(COLLECTIONS.USERS).
        insertOne(user).then(
            async () => {
                return {
                    status: true,
                    message: `El email ${user.email} ha sido registrado correctamente`,
                    user
                };
            }
        ).catch((err: Error) => {
            console.log(err.message);
            return {
                status: false,
                message: `Error inesperado`,
                user: null
            };
        });
            
        }
    }
};

export default resolversUserMutation;