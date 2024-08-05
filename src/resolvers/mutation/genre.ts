import { IResolvers } from "graphql-tools";
import GenreService from "../../services/genre.service";

const resolversGenreMutation: IResolvers = {
    Mutation: {
        addGenre(_, variables, context) {
            //anadimos llamada al servicio
            return new GenreService(_, variables, context).insert();
        },
        updateGenre(_, variables, context) {
            //anadimos llamada al servicio
            return new GenreService(_, variables, context).modify();
        }
    }
};

export default resolversGenreMutation;