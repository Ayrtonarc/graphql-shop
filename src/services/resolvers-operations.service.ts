import { IContextData } from "../interfaces/context-data.interface";
import { findElements } from "../lib/db-operations";

class ResolversOperationsService {
    private root: object;
    private variables: object;
    private context: IContextData;
    constructor(root: object, variables: object, context: IContextData) {
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
                genres: await findElements(this.context.db, collection)
            };
        } catch (error){
            return{
                status: false,
                message: `Lista de ${ listElement } no cargada: ${error} `,
                genres: null
            };
        }
    }
    //Obtener Detalles del item

    //Anadir Item

    // Modificar el item 

    //Eliminar item
}

export default ResolversOperationsService;