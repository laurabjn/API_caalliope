import {
  type CanActivate,
  type ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { type Request } from 'express'
import { jwtConstants } from 'src/modules/auth/constantes'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor (private readonly jwtService: JwtService) {}

  async canActivate (context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const token = this.extractTokenFromHeader(request)
    if (token == null) {
      throw new UnauthorizedException()
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: jwtConstants.secret
        }
      )
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request.user = payload
    } catch {
      throw new UnauthorizedException()
    }
    return true
  }

  private extractTokenFromHeader (request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
