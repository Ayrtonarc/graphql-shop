import { IResolvers } from 'graphql-tools';
import { COLLECTIONS } from '../config/constants';

const resolversMutation: IResolvers = {
    Mutation: {
       async register (_, { user }, { db })  {
        //comprobar que el usuario no existe
        const userCheck = await db.collection(COLLECTIONS.USERS).
            findOne({email: user.email});

            if(userCheck !== null){
                return {
                    status: false,
                    message: `El email ${user.email} ya esta registrado`,
                    user: null
                };
            }
          const lastUser = await db.collection(COLLECTIONS.USERS).
            find().
            limit(1).
            sort({ registerDate: -1}).toArray();

        if(Object.keys(lastUser).length === 0){
            user.id = 1;
        }else{
            user.id = lastUser[0].id +1;
        }
        
        user.registerDate = new Date().toISOString();

        return await db.
        collection(COLLECTIONS.USERS).
        insertOne(user).then(
            async () => {
                return {
                    status: true,
                    message: `El email ${user.email} esta registrado correctamente`,
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

export default resolversMutation;