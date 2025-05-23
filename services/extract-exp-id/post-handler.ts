import { type Output,parseInput } from "../../lib/types.js";
import { extractIds } from "./extract-exp-id.js";

const baseUrl = process.env.FORM_BASE_URL ?? "";

const handler = async (input: unknown): Promise<Output> => {
  const parseResult = parseInput(input);
  if(!parseResult.success){
    return {
      status: "failure",
      message: `Invalid input structure : ${parseResult.error}`
    }
  }
  try{
    const {key, data} = parseResult.data;
    const responses = await Promise.all(data.map(async ({id,content}) => {
      const res = await extractIds(baseUrl,content);
      if(res.status === "success") {
        const url = `${res.url}&data.id=${id}`;
        return {id, ...res, url};
      }
      return {id,...res};
    }));
    return {
      status: "success",
      key,
      data: responses
    }
  }catch(e){
    const message = e instanceof Error ? e.message : "An error occurred";
    return {
      status: "failure",
      message: message
    }
  }
}

const dummyHandler = async (input: unknown): Promise<Output> => {
  const parseResult = parseInput(input);
  if(!parseResult.success){
    return {
      status: "failure",
      message: `Invalid input structure : ${parseResult.error}`
    }
  }
  const {key, data} = parseResult.data;
  try{
    const responses = await Promise.all(data.map(async ({id,content}) => {
      return {
        id,
        status: "success" as const,
        codes: ["dummy"],
        url: `https://dummy.com?data.id=${id}`,
        text:"dummy",
        tokens: {
          total: 0,
          prompt: 0,
          completion: 0,
        }
      };
    }
    ));
    return {
      status: "success",
      key,
      data: responses
    }
  }catch(e){
    const message = e instanceof Error ? e.message : "An error occurred";
    return {
      status: "failure",
      message: message
    }
  }
}

export {handler,dummyHandler}