import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await fetch("https://api.quotable.io/random");
    const data = await response.json();
    res.status(200).json({ text: data.content, author: data.author });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch quote" });
  }
}
