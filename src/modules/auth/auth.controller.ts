import { Body, Controller, HttpCode, HttpStatus, Post, Get, Request, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthGuard } from 'src/utils/guards/auth.guard'
import { SignInDto } from './dto/sign-in.dto'
import * as bcrypt from 'bcrypt'
import { SignUpDto } from './dto/sign-up.dto'

@Controller('auth')
export class AuthController {
  constructor (private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn (@Body() signInDto: SignInDto): Promise<any> {
    return await this.authService.signIn(signInDto)
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async signUp (@Body() signUpDto: SignUpDto): Promise<any> {
    try {
      const salt = await bcrypt.genSalt(10)
      signUpDto.password = await bcrypt.hash(signUpDto.password, salt)

      const user = await this.authService.signUp(signUpDto)

      return {
        success: true,
        message: 'User Register Successfully',
        data: user
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile (@Request() req): any {
    return req.user
  }
}
