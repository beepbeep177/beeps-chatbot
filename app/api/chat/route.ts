export const runtime = "nodejs";

import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

const client = new BedrockRuntimeClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // Load your resume
    const resumePath = path.join(process.cwd(), "app", "data", "resume.txt");
    const resumeText = fs.readFileSync(resumePath, "utf8");

    // Construct enhanced prompt
    const prompt = `You are Bea's professional AI assistant helping people learn about Bea Therese Y. Paras.

INSTRUCTIONS:
- Answer using ONLY information from the resume below
- Your name is Beeps, and you're Bea's cool assistant.
- Match your response length to the question:
  * Simple greetings ("hi", "hello") = Brief, friendly introduction
  * Specific questions = Detailed, relevant answers
  * General questions = Concise overview
- Be conversational and professional
- If information isn't available, say "I don't have that information in Bea's resume"
- Don't dump all resume info at once
- When listing multiple items, use this format:
  • Item 1: Description
  • Item 2: Description
- Use line breaks between different sections
- Call the user "bow"

RESUME DATA:
${resumeText}

User Question: "${message}"

Provide an appropriate response:`;

    // Try Nova first, fallback to Titan
    let reply = "I don't know bow, uyy nagryhme HAHA";
    const models = [process.env.BEDROCK_MODEL!, process.env.BEDROCK_FALLBACK!].filter(Boolean);
    
    for (const modelId of models) {
      try {
        let command;
        
        if (modelId.includes('nova')) {
          // Nova format
          command = new InvokeModelCommand({
            modelId,
            body: JSON.stringify({
              messages: [{ role: "user", content: [{ text: prompt }] }],
              inferenceConfig: {
                max_new_tokens: 800,
                temperature: 0.3,
                top_p: 0.9
              }
            })
          });
        } else {
          // Titan format
          command = new InvokeModelCommand({
            modelId,
            body: JSON.stringify({
              inputText: prompt,
              textGenerationConfig: {
                maxTokenCount: 800,
                temperature: 0.3,
                topP: 0.9
              }
            })
          });
        }
        
        const response = await client.send(command);
        const text = await response.body.transformToString();
        const data = JSON.parse(text);
        
        // Parse based on model type
        if (modelId.includes('nova')) {
          reply = data.output?.message?.content?.[0]?.text || "I don't know bow, uyy nagryhme HAHA";
        } else {
          reply = data.results?.[0]?.outputText || "I don't know bow, uyy nagryhme HAHA";
        }
        
        if (reply && reply !== "I don't know bow, uyy nagryhme HAHA") break;
        
      } catch (err) {
        console.warn(`Model ${modelId} failed:`, err);
        continue;
      }
    }

    return NextResponse.json({ reply });
  } catch (err: any) {
    console.error("[BEDROCK_CHAT_API_ERROR]:", err);
    return NextResponse.json({ error: err.toString() }, { status: 500 });
  }
}