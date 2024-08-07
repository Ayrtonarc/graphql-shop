import { Db } from "mongodb";
import { IContextData } from "../interfaces/context-data.interface";
import { IVariables } from "../interfaces/variable.interface";
import { findElements, findOneElement, insertOneElement, updateOneElement } from "../lib/db-operations";

class ResolversOperationsService {
    private root: object;
    private variables: IVariables;
    private context: IContextData;
    constructor(root: object, variables: IVariables, context: IContextData) {
       this.root = root;
       this.variables = variables;
       this.context = context;
    }

    protected getDb(): Db { return this.context.db; }
    protected getVariables(): IVariables{ return this.variables;    }
    //Listar informacion
    protected async list(collection: string, listElement: string) {
        try {
            return{
                status: true,
                message: `Lista ${ listElement } correctamente cargada`,
                items: await findElements(this.context.db, collection)
            };
        } catch (error){
            return{
                status: false,
                message: `Lista de ${ listElement } no cargada: ${error} `,
                items: null
            };
        }
    }
    //Obtener Detalles del item
    protected async get(collection: string){
        
            const collectionLabel = collection.toLowerCase();
            try {
                return await findOneElement(this.context.db, collection, { id: this.variables.id}).then(
                result =>{
                    if (result) {
                        return {
                            status: true,
                            message: `${collectionLabel} La coleccion ha sido cargada correctamente con sus detalles`,
                            item: result
                        };
                    }
                    return {
                        status: true,
                        message: `${collectionLabel} no ha obtenido detalles por que no existe`,
                        item: null
                    };
                }
            );
            }catch (error){
                return {
                    status: false,
                    message: `Error inesperado al querer cargar los detalles de ${collectionLabel}`,
                    item: null
                };
            }
    }
    //Anadir Item
    protected async add(collection: string, document: object, item: string){
        try {
            return await insertOneElement(this.context.db, collection, document).then(
                res => {
                    if (res.result.ok === 1){
                        return{
                            status: true,
                            message: `Anadido correctamente el  ${item}.`,
                            item: document
                        }
                    }
                    return{
                        status: false,
                        message: `No se ha insertado el  ${item}. Intentalo de nuevo por favor`,
                        item: null
                    }
                }
            );
        }catch{
            return {
                status: false,
                message: `Error inesperado al insertar el ${item}. Intentalo de nuevo por favor`,
                item: null
            };
        }
    }
    // Modificar el item 
    protected async update(collection: string, filter: object, objectUpdate: object, item: string) {
        try{
            return await updateOneElement(
                this.getDb(),
                collection,
                filter,
                objectUpdate
            ).then(
                res => {
                    if(res.result.nModified === 1 && res.result.ok ){
                        return {
                            status: true,
                            message: `Elemento del ${item} actualizado correctamente.`,
                            item: Object.assign({}, filter, objectUpdate)
                        };
                    }
                    return {
                        status: false,
                        message: `Elemento del ${item} no se ha actualizado comprueba que estas filtrando correctamente`,
                        item: null
                    };
                }
            );
        } catch(error){
          return{
            status: false,
            message: `Error inesperado al actualizar el ${item}. Intentalo de nuevo por favor`,
            item: null
          } 
        }
    }
    //Eliminar item
    protected async del(coleccion: string, filter: object, item: string){
        
    }
}

export default ResolversOperationsService;