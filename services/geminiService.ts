//
// -----------------------------------------------------------------------------
// IMPORTANT ARCHITECTURAL NOTE
// -----------------------------------------------------------------------------
// This file now represents the logic for our **SECURE BACKEND PROXY**.
// In a real production application, this code would run on a server (e.g., as 
// part of our FastAPI backend). It would expose an endpoint like '/api/ai-assist'
// that the frontend calls.
//
// The API key is stored securely on this server and is NEVER exposed to the
// client-side React application. This is the standard, secure way to handle
// secret API keys.
// -----------------------------------------------------------------------------
//

import { GoogleGenAI } from "@google/genai";
import { AIAssistAction } from '../types';

if (!process.env.API_KEY) {
    // In a real backend, this would be a hard failure.
    // For the simulation, we'll rely on the user having set it up.
    console.warn("API_KEY environment variable not set. Please set it in your environment.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "YOUR_API_KEY_HERE" });

const PROMPTS: { [key in AIAssistAction]: (code: string, prompt?: string) => string } = {
  [AIAssistAction.GENERATE]: (code: string, prompt?: string) => `
    You are an expert Python code generator.
    Based on the following prompt, generate a complete, executable, and well-documented Python script.
    Ensure the code is clean, efficient, and follows best practices.
    Format the entire response as a single, well-formatted Markdown block with the language set to python.

    Prompt: "${prompt}"
  `,
  [AIAssistAction.EXPLAIN]: (code: string) => `
    You are an expert Python code explainer.
    Explain the following Python code in a clear, concise, and easy-to-understand way.
    Break down the logic, explain the purpose of each function or class, and highlight any important or complex parts.
    Use Markdown for formatting (e.g., headings, lists, bold text). Wrap all code snippets in Markdown code blocks.

    Code:
    \`\`\`python
    ${code}
    \`\`\`
  `,
  [AIAssistAction.REFACTOR]: (code: string) => `
    You are an expert Python code refactoring assistant.
    Analyze the following Python code and suggest improvements to make it more efficient, readable, and pythonic.
    Provide the refactored code in a Markdown block with the language set to python.
    Below the code, explain the key changes you made and why they are beneficial using a bulleted list.

    Original Code:
    \`\`\`python
    ${code}
    \`\`\`
  `,
  [AIAssistAction.DEBUG]: (code: string) => `
    You are an expert Python debugger.
    Analyze the following Python code to find any potential bugs, errors, or logical issues.
    If you find a bug, provide a corrected version of the code in a markdown block with the language set to python.
    Then, explain what the bug was and how your correction fixes it. If no bugs are found, state that the code appears to be correct and explain why.

    Code to debug:
    \`\`\`python
    ${code}
    \`\`\`
  `,
  [AIAssistAction.TEST]: (code: string) => `
    You are an expert Python test generator.
    Generate comprehensive unit tests for the following Python code using the 'pytest' framework.
    Create a test for each function or method, covering edge cases and typical scenarios.
    Provide the complete test code in a single Markdown code block with the language set to python.

    Code to generate tests for:
    \`\`\`python
    ${code}
    \`\`\`
  `,
};

export async function* getAIAssistanceStream(
  action: AIAssistAction,
  code: string,
  prompt?: string
): AsyncGenerator<string> {
  try {
    const model = 'gemini-2.5-flash';
    const finalPrompt = PROMPTS[action](code, prompt);

    const responseStream = await ai.models.generateContentStream({
      model: model,
      contents: finalPrompt,
    });
    
    for await (const chunk of responseStream) {
        yield chunk.text;
    }

  } catch (error) {
    console.error(`Error calling Gemini API for action ${action}:`, error);
    if (error instanceof Error) {
        throw new Error(`[Gemini API Error] ${error.message}`);
    }
    throw new Error('An unknown error occurred while communicating with the Gemini API.');
  }
};
