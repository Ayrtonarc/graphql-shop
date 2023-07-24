import { Db } from 'mongodb';

/**
 * obtener un id que se requiere en el nuevo usuario
 * @param database BDD con la que se esta trabajando
 * @param collection colleccion de datos con la que se quiere buscar
 * @param sort como queremos ordenarlo {propiedad  -1}
 * @returns 
 */

export const asigDocumentId = async (
    database: Db,
    collection: string,
    sort: object = { registerDate: -1 },

) => {
    const lastElement = await database
    .collection(collection)
    .find()
    .limit(1)
    .sort(sort)
    .toArray();
    if(lastElement.length === 0){
        return 1;
    }
    return lastElement[0].id + 1;
};
