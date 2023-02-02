import type { NextApiRequest, NextApiResponse } from "next";
import redis from "../../utils/redis";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // make a request to redis to get the thread count
  let threadCount;
  if (redis) {
    threadCount = await redis.get("threadCount");
  }
  res.status(200).json({ threadCount: threadCount || 0 });
}
