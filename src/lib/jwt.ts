import { IJwt } from "../interfaces/jwt.interface";
import { EXPIRETIME, MESSAGES, SECRET_KEY  } from "./../config/constants";
import jwt from 'jsonwebtoken';

class JWT {
    private secretkey = SECRET_KEY as string;
    //informacion del payload caducidad 24 hrs
    sign(data: IJwt, expiresIn: number = EXPIRETIME.H24 ){ 
        return jwt.sign(
            { user: data.user },
            this.secretkey,
            { expiresIn } // 24 hrs 
        );
    }
    verify(token: string){
        try{
            return jwt.verify(token, this.secretkey) as string;
        }catch(e){
            return MESSAGES.TOKEN_VERIFICATION_FAILED;
        }
    }
}

export default JWT;