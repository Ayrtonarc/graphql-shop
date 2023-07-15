import { Ijwt } from "../interfaces/jwt.interface";
import { MESSAGES, SECRET_KEY  } from "./../config/constants";
import jwt from 'jsonwebtoken';

class JWT {
    private secretkey = SECRET_KEY as string;

    sign(data: Ijwt){
        return jwt.sign(
            { user: data.user },
            this.secretkey,
            { expiresIn: 24 * 50 * 60 } // 24 hrs 
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