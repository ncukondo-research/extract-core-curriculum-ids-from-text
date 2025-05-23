import { chatCompletion, type CompletionResponse, type Message } from "../../lib/chat-completion.js";
import { promptTemplate } from "./prompt-template.js";
import type { FailureResponse, SuccessResponse } from "../../lib/types.js";
import { idTemplate } from "./id-template.js";

const makeExtractIdPrompt = (content: string) => {
  const prompt = promptTemplate;
  return `${prompt}${content}`
}
const extractIdsApi = async (content: string): Promise<CompletionResponse | undefined> => {
  const text = makeExtractIdPrompt(content);

  const messages = [
    {
      role: "user",
      content: text,
    },
  ] as const satisfies ReadonlyArray<Message>;
  const res = await chatCompletion(messages,"gpt-4-turbo-preview",{temperature:0.2});
  return res;
}

type FormattedIds ={
  procedures: string[];
  diseases: string[];
  symptoms: string[];
  examinations: string[];
}


const convertToFormattedIds = (ids: string[]): FormattedIds => {
  const procedures = idTemplate.procedures.map((item) => item.id);
  const diseases = idTemplate.diseases.map((item) => item.id);
  const symptoms = idTemplate.symptoms.map((item) => item.id);
  const examinations = idTemplate.examinations.map((item) => item.id);

  return {
    procedures: ids.filter((id) => procedures.includes(id)),
    diseases: ids.filter((id) => diseases.includes(id)),
    symptoms: ids.filter((id) => symptoms.includes(id)),
    examinations: ids.filter((id) => examinations.includes(id)),
  }
}

const convertToText = (ids: string[]): string => {
  const formattedIds = convertToFormattedIds(ids);
  const labelTemplate = [...idTemplate.procedures,...idTemplate.diseases,...idTemplate.symptoms,...idTemplate.examinations];
  const header = "| ID | Item |\n| --- | --- |\n";
  const text = Object.entries(formattedIds).map(([key, idList]) => {
    const table = idList.length === 0 ? "" : `${header}${idList.map((id) => `| ${id} | ${labelTemplate.find((label) => label.id === id)?.item} |`).join("\n")}`; 
    return `### ${key}\n\n${table}`
  }).join("\n\n");
  return text;
}

const convertToUrl = (baseUrl:string,ids: string[]): string => {
  const formattedIds = convertToFormattedIds(ids);
  const params = Object.entries(formattedIds).flatMap(([key, idList]) => {
    return idList.map((id,i) => [`data.${key}.${i}`,`${id}`]);
  })
  const url = `${baseUrl}?${params.map((param) => param.join("=")).join("&")}`;
  return url;
}

type ExtractIdsResponse = Omit<SuccessResponse,"id"> | Omit<FailureResponse,"id">;

const extractIds = async (baseUrl:string, content: string): Promise<ExtractIdsResponse> => {
  const res = await extractIdsApi(content);
  if(res === undefined){
    return {
      status: "failure",
      message: "Failed to get response from AI"
    }
  }
  const text = res.choices[0].message.content;
  const ids = text.split(",").map((id) => id.trim());
  const tokens = {total: res.usage.total_tokens, prompt: res.usage.prompt_tokens, completion: res.usage.completion_tokens};
  const url = await convertToUrl(baseUrl,ids);
  return {
    status: "success",
    codes: ids,
    url: url,
    text,
    tokens
  }
}

export {extractIds,convertToUrl,convertToFormattedIds,convertToText}
