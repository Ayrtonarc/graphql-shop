import { COLLECTIONS, EXPIRETIME, MESSAGES } from '../config/constants';
import { IContextData } from '../interfaces/context-data.interface';
import { findOneElement } from '../lib/db-operations';
import JWT from '../lib/jwt';
import bcrypt, { hash } from 'bcrypt';
import ResolversOperationsService from "./resolvers-operations.service";

class UsersService extends ResolversOperationsService {
    private collection = COLLECTIONS.USERS;
    constructor(root: object, variables: object, context: IContextData) {
       super(root, variables, context); 
    }
    // lista de usuarios
    async items() {
        const result = await this.list(this.collection, 'usuarios');
        return { status: result.status, message: result.message, users: result.items };
    }
    //autenticarnos
    async auth() {
        let info = new JWT().verify(this.getContext().token!);
            if(info === MESSAGES.TOKEN_VERIFICATION_FAILED) {
                return {
                    status: false,
                    message: info,
                    user: null
                };
            }
            return{
                status: true,
                message: 'Usuario autenticado mediante token',
                user: Object.values(info)[0]
            }; 
    }
    // Iniciar sesion
    async login(){
        try {
            const variables = this.getVariables().user;
            const user = await findOneElement(this.getDb(), this.collection, { email: variables?.email });

            if(user === null) {
                return {
                    status: false,
                    message: 'Usuario no existe',
                    token: null,
                };
            }
            const passwordCheck = bcrypt.compareSync(String(variables?.password || ''), user.password || '');

                if(passwordCheck !== null){
                    delete user.password;
                    delete user.birthday;
                    delete user.registerDate;
                }
            return {
                status: passwordCheck,
                message:
                    !passwordCheck
                        ? 'password o correo no correctos'
                        : 'Usuario cargado correctamente',
                token:
                    !passwordCheck
                        ? null
                        : new JWT().sign({ user }, EXPIRETIME.H24),
                    user:
                    !passwordCheck
                        ? null
                        : user,
            };

        } catch (error) {
            console.log(error);
            return {
                status: false,
                message: 'Error al cargar el usuario',
                token: null,
            };
        }
    }
    //Registrar un usuario
}

export default UsersService;