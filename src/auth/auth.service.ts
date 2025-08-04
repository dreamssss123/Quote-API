import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUSer(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne2(username);
        if( user && user.password === pass ){
            const { password, ...result } =  user;
            return result;
        }

        return null;
    }

    async login(user: any) {
        const payload =  { username: user.username, sub: user.userId };
        return {
            status: 'ok',
            id: user.id,
            username: user.username,
            access_token: this.jwtService.sign(payload),
        };
    }

    async validatejwt(req: any){
        // const request = context.switchToHttp().getRequest();
        // // const token = this.extractTokenFromHeader(request);
        const [type, token] = req.headers.authorization?.split(' ') ?? [];
        // let checkz = type === 'Bearer' ? token : undefined;
        // console.log(token);
        // // const token = type === 'Bearer' ? token : undefined;
        if (!token) {
        throw new UnauthorizedException();
        }
        try {
        const payload = await this.jwtService.verifyAsync(
            token,
            {
                secret: jwtConstants.secret
            }
        );
        // 💡 We're assigning the payload to the request object here
        // so that we can access it in our route handlers
        req['user'] = payload;
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }
}
