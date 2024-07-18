import { COLLECTIONS } from "../config/constants";
import { IContextData } from "../interfaces/context-data.interface";
import ResolversOperationsService from "./resolvers-operations.service";

class GenreService extends ResolversOperationsService {
    constructor(root: object, variables: object, context: IContextData) {
       super(root, variables, context); 
    }

   async items(){
        const result = await this.list(COLLECTIONS.GENRES, 'generos');
        return { status: result.status, message: result.message, genres: result.items };
    }

    async details(){
        const result = await this.get(COLLECTIONS.GENRES);
        return { status: result.status, message: result.message, genre: result.item };
    }

    async insert() {
        const genre = this.getVariables().genre;
        //
        if (!this.checkData(genre || ''))  {
            return {
                status: false,
                message: 'El genero no se ha especificado correctamente',
                genre: null
            };
        }
        //
        //
        const genreObject = {
            id: '',
            name: '',
            slug: ''
        };
        const result = await this.add(COLLECTIONS.GENRES, {
            id: '85',
            name: 'Realidad Virtual',
            slug: 'realidad-virtual'
        }, 'genero');
        return { status: result.status, message: result.message, genre: result.item };
    }

    private checkData(value: string){
        return (value === '' || value === undefined) ? false: true;
    }

}

export default GenreService;