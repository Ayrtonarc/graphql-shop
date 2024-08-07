import { filter } from "compression";
import { COLLECTIONS } from "../config/constants";
import { IContextData } from "../interfaces/context-data.interface";
import { asigDocumentId, findOneElement } from "../lib/db-operations";
import ResolversOperationsService from "./resolvers-operations.service";
import slugify from "slugify";

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
            id: await asigDocumentId(this.getDb(), this.collection, { id: -1 }),
            name: genre,
            slug: slugify(genre || '', { lower: true})
        };
        const result = await this.add(this.collection, genreObject, 'genero');
        return { status: result.status, message: result.message, genre: result.item };
    }
    async modify(){
        const id = this.getVariables().id;
        const genre = this.getVariables().genre;
        //comprobar que el id es correcto
        if(!this.checkData(String(id) || '')){
            return {
                status: false,
                message: 'El ID del genero no se ha especificado correctamente',
                genre: null
            };
        }
        if(!this.checkData(genre || '')){
            return {
                status: false,
                message: 'El genero existe en la base de datos, intenta con otro genero',
                genre: null
            };
        }
        const objectUpdate = {
            name: genre,
            slug: slugify(genre || '', {lower: true})
         };
        
        const result = await this.update(this.collection, { id }, objectUpdate, 'genero');
        return { status: result.status, message: result.message, genre: result.item };
    }

    async delete(){
        const id = this.getVariables().id;
        if(!this.checkData(String(id) || '')){
            return {
                status: false,
                message: 'El ID del genero no se ha especificado correctamente',
                genre: null
            };
        }

        const result = await this.del(this.collection, { id },  'genero');
        return { status: result.status, message: result.message};
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