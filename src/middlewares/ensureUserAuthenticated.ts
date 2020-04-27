import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import sessionConfig from '../config/session';

import AppError from '../errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureUserAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token is missing!', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decodedToken = verify(token, sessionConfig.jwt.secret);

    const { sub } = decodedToken as TokenPayload;

    // Special type declaration, type overwrite
    request.user = {
      id: sub,
    };

    return next();
  } catch (err) {
    throw new AppError('Invalid token!', 401);
  }
}
