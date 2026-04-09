import { generatorStreamToken } from "../lib/stream.js";

export async function getStreamToken(req, res) {
  try {
    const token = generatorStreamToken(req.user.id);

    res.status(200).json({ token });
  } catch (error) {
    console.log("error in getStreamToken:", error.message);
    res.status(500).json({ message: "internal server error" });
  }
}
