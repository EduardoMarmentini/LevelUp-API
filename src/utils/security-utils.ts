import crypto from 'crypto';

// Gera salt aleatório (16 bytes, 128 bits)
export function generateSalt(): string {
  return crypto.randomBytes(16).toString('hex');
}

// Gera hash SHA-256 da senha + salt
export function hashPassword(password: string, salt: string): string {
  const hash = crypto.createHash('sha256');
  hash.update(password + salt);
  return hash.digest('hex');
}
