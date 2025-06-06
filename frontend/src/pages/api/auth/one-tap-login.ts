import { NextApiRequest, NextApiResponse } from "next";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { credential } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(401).json({ error: "Invalid token" });
    }

    return res.status(200).json({
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
    });
  } catch (error) {
    console.error("One Tap login failed:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
}
