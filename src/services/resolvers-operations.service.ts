import { IContextData } from "../interfaces/context-data.interface";
import { IVariables } from "../interfaces/variable.interface";
import { findElements, findOneElement } from "../lib/db-operations";

class ResolversOperationsService {
    private root: object;
    private variables: IVariables;
    private context: IContextData;
    constructor(root: object, variables: IVariables, context: IContextData) {
       this.root = root;
       this.variables = variables;
       this.context = context;
    }

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

    // Modificar el item 

    //Eliminar item
}

export default ResolversOperationsService;