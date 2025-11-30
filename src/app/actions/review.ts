"use server";

import Groq from "groq-sdk";

export async function generateReview(diff: string) {
  const apiKey = process.env.GROQ_API_KEY;
  
  if (!apiKey) return { error: "Groq API Key not configured in environment variables" };

  try {
    const groq = new Groq({ apiKey });

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are an expert code reviewer. Analyze the provided git diff. Identify potential bugs, security issues, and performance improvements. Be concise and constructive. Format your response in Markdown."
        },
        {
          role: "user",
          content: `Review the following code changes:\n\n${diff.substring(0, 15000)}` // Truncate to avoid context limits if necessary
        }
      ],
      model: "openai/gpt-oss-20b",
    });

    return { data: completion.choices[0]?.message?.content || "No review generated." };
  } catch (error: any) {
    console.error("Groq API Error:", error);
    return { error: error.message || "Failed to generate review" };
  }
}
