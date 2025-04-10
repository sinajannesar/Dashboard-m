import * as jose from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const secretEncoder = new TextEncoder().encode(JWT_SECRET);

export async function verifyToken(
  token: string
): Promise<{ userId: string } | null> {
  try {
    if (!token) return null;

    const { payload } = await jose.jwtVerify(token, secretEncoder);

    if (!payload || !payload.userId) {
      return null;
    }

    return { userId: payload.userId as string };
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

export async function generateToken(userId: string): Promise<string> {
  const token = await new jose.SignJWT({ userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('24h')
    .setIssuedAt()
    .sign(secretEncoder);

  return token;
}
