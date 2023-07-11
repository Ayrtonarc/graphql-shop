import { IResolvers } from 'graphql-tools';

const resolversQuery: IResolvers = {
    Query: {
        users: (root, args, context, info) => {
            return [
                {
                    id: 1!,
                    name: 'anartz'!,
                    lastname: 'muxica'!,
                    email: ''!,
                    password: ''!,
                    registerDate: ''!,
                    birthday: ''!
                }
            ]
        }
    }
};

export default resolversQuery;