import { IContextData } from "../interfaces/context-data.interface";
import ResolversOperationsService from "./resolvers-operations.service";

class GenreService extends ResolversOperationsService {
    constructor(root: object, variables: object, context: IContextData) {
       super(root, variables, context); 
    }

}

export default GenreService;