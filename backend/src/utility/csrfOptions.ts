import { DoubleCsrfConfigOptions } from "csrf-csrf";

export const doubleCsrfOptions: DoubleCsrfConfigOptions = {
  getSecret: (req) => req.cookies['XSRF-TOKEN'],  
  cookieName: "XSRF-TOKEN",                       
  cookieOptions: {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: "strict",
    path: "/",
  },
  getTokenFromRequest: (req) => {
    return req.headers['x-xsrf-token'] || req.body._csrf;
  },
  size: 64,                                     
  ignoredMethods: ["GET", "HEAD", "OPTIONS"],    
};
