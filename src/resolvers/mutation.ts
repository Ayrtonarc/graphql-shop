import { IResolvers } from 'graphql-tools';
import { COLLECTIONS } from '../config/constants';

const resolversMutation: IResolvers = {
    Mutation: {
       async register (_, { user }, { db })  {
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
            return user;
            }
        ).catch((err: Error) => {
            console.log(err.message);
            return null;
        });
            
        }
    }
};

export default resolversMutation;