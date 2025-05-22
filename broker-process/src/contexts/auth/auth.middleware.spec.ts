import { AuthMiddleware } from './auth.middleware';
import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

describe('AuthMiddleware', () => {
  let middleware: AuthMiddleware;
  let configService: jest.Mocked<ConfigService>;
  const next = jest.fn();

  beforeEach(() => {
    configService = {
      get: jest.fn(),
    } as any;
    configService.get.mockReturnValue('test-api-key');
    middleware = new AuthMiddleware(configService);
    (middleware as any)._apiKey = 'test-api-key';
    next.mockClear();
  });

  it('should call next if api key matches', () => {
    const req = { headers: { 'x-api-key': 'test-api-key' } } as any;
    const res = {} as any;
    expect(() => middleware.use(req, res, next)).not.toThrow();
    expect(next).toHaveBeenCalled();
  });

  it('should throw UnauthorizedException if api key does not match', () => {
    const req = { headers: { 'x-api-key': 'wrong-key' } } as any;
    const res = {} as any;
    expect(() => middleware.use(req, res, next)).toThrow(UnauthorizedException);
    expect(next).not.toHaveBeenCalled();
  });

  it('should throw UnauthorizedException if api key is missing', () => {
    const req = { headers: {} } as any;
    const res = {} as any;
    expect(() => middleware.use(req, res, next)).toThrow(UnauthorizedException);
    expect(next).not.toHaveBeenCalled();
  });
});