import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;

  let username = 'username';
  let password = 'password';
  let token = 'jwtToken';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, JwtService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('login', () => {
    it('should login and return the token', async () => {
      jest.spyOn(jwtService, 'sign').mockReturnValue(token);
      const result = await service.login(username, password);

      expect(result).toEqual(token);
    });
  });
});
