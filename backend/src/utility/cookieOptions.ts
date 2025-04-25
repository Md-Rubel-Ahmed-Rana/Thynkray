export const cookieOptions = {
    httpOnly: true,
    sameSite: "none" as const,
    secure: true,
    maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
  };