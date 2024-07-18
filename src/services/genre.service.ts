import { COLLECTIONS } from "../config/constants";
import { IContextData } from "../interfaces/context-data.interface";
import { findOneElement } from "../lib/db-operations";
import ResolversOperationsService from "./resolvers-operations.service";

class GenreService extends ResolversOperationsService {
    collection = COLLECTIONS.GENRES;
    constructor(root: object, variables: object, context: IContextData) {
       super(root, variables, context); 
    }

   async items(){
        const result = await this.list(this.collection, 'generos');
        return { status: result.status, message: result.message, genres: result.items };
    }

    async details(){
        const result = await this.get(this.collection);
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
        //Comprobar que no existe
        if(await this.checkInDatabase(genre || '')){
            return {
                status: false,
                message: 'El genero existe en la base de datos, intenta con otro genero',
                genre: null
            };
        }
        //
        const genreObject = {
            id: '',
            name: '',
            slug: ''
        };
        const result = await this.add(this.collection, {
            id: '85',
            name: 'Realidad Virtual',
            slug: 'realidad-virtual'
        }, 'genero');
        return { status: result.status, message: result.message, genre: result.item };
    }

    private checkData(value: string){
        return (value === '' || value === undefined) ? false: true;
    }

    private async checkInDatabase(value: string){
        return await findOneElement(this.getDb(), this.collection, {
            name: value

        });
    }

}

export default GenreService;