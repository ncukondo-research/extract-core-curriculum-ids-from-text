# Extract Core Curriculum Codes from Text

This is a simple web application that extracts [core curriculum codes](https://github.com/core-curriculum/data/tree/main/2022/en) from text using the OpenAI API. It is built with TypeScript and uses the Bun runtime.

## Prompts

The prompt sent to the OpenAI API is stored in [prompts/extract_id_ja.ts](prompts/extract_id_ja.ts). The actual prompt used is in Japanese, but an English translation of the prompt is available in [prompts/extract_id_en.ts](prompts/extract_id_en.ts). The prompt is sent using the `createChatCompletion` method of the OpenAI API.

## Installation

To run this application, you need to have [Bun](https://bun.sh/) installed. You can install Bun by following the instructions on their official website.

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

## Environment Variables

You need to set the following environment variables:

- `OPENAI_API_KEY`: Your OpenAI API key. You can get it from the OpenAI website.
- `API_KEY`: A specific key for this API. This is used to prevent misuse from others. The processing is performed only if this string is correct.
- `FORM_BASE_URL`: Used to create a form URL for checking the results as a response from this API.

## API Specification

- Entry point: `/api`
- Dummy entry point: `/api/dummy`
- Only POST requests are accepted. Both input and output are in JSON format.

### Input

Processing is performed only if the api-key is correct. This is to prevent misuse from others. The api-key must be set in the environment variable `API_KEY`.

```typescript
type Input = {
    key: "api-key";
    data: {
        id: string;
        content: string;
    }[];
}
```

### Output

ChatGPT analyzes the `content` in the above input and extracts core curriculum codes.

```typescript
type Output = {
    status: "success";
    data: ({
        id: string;
        status: "success";
        codes: string[];
        url: string;
    } | {
        id: string;
        message: string;
        status: "failure";
    })[];
} | {
    status: "failure";
    message: string;
}
```
