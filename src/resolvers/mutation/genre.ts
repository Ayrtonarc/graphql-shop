import { IResolvers } from "graphql-tools";
import GenreService from "../../services/genre.service";

const resolversGenreMutation: IResolvers = {
    Mutation: {
        addGenre(_, variables, context) {
            //anadimos llamada al servicio
            return new GenreService(_, variables, context).insert();
        }
    }
};

export default resolversGenreMutation;