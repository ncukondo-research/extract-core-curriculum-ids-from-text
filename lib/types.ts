import {z} from 'zod';

const apiKey = process.env.API_KEY ?? "";

// Upper limits for a single request.
// - MAX_ITEMS: every item triggers one concurrent OpenAI call (Promise.all),
//   so this also bounds cost and execution time per request.
//   The evaluation set in analysis/ has 40 records.
// - MAX_CONTENT_LENGTH: evaluation records are 73-1473 characters
//   (analysis/results/letter_count_summary.csv); 10,000 leaves ample margin.
// - MAX_ID_LENGTH: ids are short record identifiers appended to the form URL.
const MAX_ITEMS = 50;
const MAX_CONTENT_LENGTH = 10_000;
const MAX_ID_LENGTH = 100;

const keySchema = z.object({
  key: z.literal(apiKey),
});

const inputSchema = z.object({
  key: z.literal(apiKey),
  data: z.array(z.object({
    id: z.string().max(MAX_ID_LENGTH),
    content: z.string().max(MAX_CONTENT_LENGTH),
  })).max(MAX_ITEMS)
});

type Input = z.infer<typeof inputSchema>;

const successResponseSchema = z.object({
  status: z.literal("success"),
  id: z.string(),
  codes: z.array(z.string()),
  url: z.string(),
  text: z.string(),
  tokens: z.object({
    total: z.number(),
    prompt: z.number(),
    completion: z.number(),
  }),
});

const failureResponseSchema = z.object({
  status: z.literal("failure"),
  id: z.string(),
  message: z.string(),
});

const responseSchema = z.discriminatedUnion('status',[
  successResponseSchema,
  failureResponseSchema,
]);

const successOutputSchema = z.object({
  status: z.literal("success"),
  key: z.literal(apiKey),
  data: z.array(responseSchema)
});

const failureOutputSchema = z.object({
  status: z.literal("failure"),
  message: z.string(),
});

const outputSchema = z.discriminatedUnion('status',[
  successOutputSchema,
  failureOutputSchema,
]);

type Response = z.infer<typeof responseSchema>;
type SuccessResponse = z.infer<typeof successResponseSchema>;
type FailureResponse = z.infer<typeof failureResponseSchema>;
type Output = z.infer<typeof outputSchema>;

type ParseInputResult =
  | { success: true; data: Input }
  | { success: false; message: string };

// Check the API key on its own before looking at `data`, so that a caller
// without the key cannot make the server validate an arbitrary payload.
// Error messages are built here instead of returning the ZodError, because
// the ZodError for `key` contains the expected value, i.e. the API key itself.
const parseInput = (input: unknown): ParseInputResult => {
  if (apiKey === "" || !keySchema.safeParse(input).success) {
    return { success: false, message: "Invalid API key" };
  }
  const result = inputSchema.safeParse(input);
  if (!result.success) {
    const details = result.error.issues
      .slice(0, 5)
      .map((issue) => `${issue.path.join(".") || "(root)"}: ${issue.message}`)
      .join("; ");
    return { success: false, message: `Invalid input structure : ${details}` };
  }
  return { success: true, data: result.data };
}

const parseOutput = (output: unknown) => {
  return outputSchema.safeParse(output);
}

export {
  type Input,
  type Output,
  type Response,
  type SuccessResponse,
  type FailureResponse,
  inputSchema,
  outputSchema,
  parseInput,
  parseOutput
}