export interface DecodedToken {
  userId: string;
  iat: number;
  exp: number;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  error?: string;
  user?: any;
}
