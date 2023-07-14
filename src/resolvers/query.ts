import { IResolvers } from 'graphql-tools';
import { COLLECTIONS } from '../config/constants';

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

        }
    }
};

export default resolversQuery;