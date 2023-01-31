import { Ratelimit } from "@upstash/ratelimit";
import type { NextApiRequest, NextApiResponse } from "next";
import requestIp from "request-ip";
import redis from "../../utils/redis";
import { OpenAIStreamPayload, OpenAIStream } from "utils/OpenAIStream";

type Data = string;
interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    title: string;
    style: string;
    tweetNumber: number;
  };
}

// Create a new ratelimiter, that allows 3 requests per 60 seconds
const ratelimit = redis
  ? new Ratelimit({
      redis: redis as any,
      limiter: Ratelimit.fixedWindow(3, "60 s"),
    })
  : undefined;

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse<Data>,
) {
  // Rate Limiter Code
  if (ratelimit) {
    const identifier = requestIp.getClientIp(req);
    const result = await ratelimit.limit(identifier!);
    res.setHeader("X-RateLimit-Limit", result.limit);
    res.setHeader("X-RateLimit-Remaining", result.remaining);

    if (!result.success) {
      res
        .status(429)
        .json(
          "Too many requests in 1 minute. Please try again in a few minutes.",
        );
      return;
    }
  }

  const { style, title, tweetNumber } = req.body;

  if (!style || !title || !tweetNumber) {
    return new Response("All fields are required", { status: 400 });
  }

  const prompt = `Write me a twitter thread on Topic → ${title},
  Style → ${style},
  Number of tweets → ${tweetNumber}`;

  const payload = {
    model: "text-davinci-003",
    prompt,
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 3400,
    n: 1,
  };

  const result = await fetch("https://api.openai.com/v1/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
    },
    method: "POST",
    body: JSON.stringify(payload),
  });

  const json = await result.json();

  const text = json.choices[0].text;
  // return text
  res.status(200).json(text);
}
