import type { VercelRequest, VercelResponse } from "@vercel/node";
import { dummyHandler } from "../../services/extract-exp-id/post-handler.js";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function (req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    //await sleep(20000);
    res.status(200).json(await dummyHandler(req.body));
  } else {
    res.send(`The method ${req.method} is not supported`);
  }
}
