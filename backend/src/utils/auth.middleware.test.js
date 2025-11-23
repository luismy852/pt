import { jest } from '@jest/globals';

// Mock de jwt.verify antes de cargar el middleware
jest.mock('jsonwebtoken', () => ({
  verify: jest.fn(() => ({ id: 1, role: 'admin' }))
}));

let authMiddleware;

beforeAll(async () => {
  const mod = await import('../middlewares/auth.js');
  authMiddleware = mod.authMiddleware;
});

describe('authMiddleware', () => {
  it('Llama next si hay token válido', () => {
    const req = { headers: { authorization: 'Bearer validtoken' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    authMiddleware(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it('Retorna 401 si no hay token', () => {
    const req = { headers: {} };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Token requerido' });
    expect(next).not.toHaveBeenCalled();
  });
});
