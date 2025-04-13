interface DecodedToken {
  exp?: number;
  [key: string]: any;
}

export const verifyToken = (token: string | undefined): boolean => {
  if (!token) return false;

  try {
    // Decode the token (assuming JWT format)
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decoded: DecodedToken = JSON.parse(window.atob(base64));

    // Check if token has expired
    if (decoded.exp) {
      const currentTime = Math.floor(Date.now() / 1000);
      return currentTime < decoded.exp;
    }

    return false;
  } catch {
    return false;
  }
};

export const getAuthToken = (): string | undefined => {
  const cookies = document.cookie.split(';');
  const tokenCookie = cookies.find(cookie =>
    cookie.trim().startsWith('auth_token=')
  );
  return tokenCookie?.split('=')[1];
};
