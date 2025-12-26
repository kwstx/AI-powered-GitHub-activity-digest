import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini Client
// We use the "gemini-1.5-flash" model as it's fast, efficient, and free-tier eligible.
const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// Rate Limiter: Simulates a "Token Bucket" for API calls
// - Max 10 calls per minute (well below the 15 limit)
// - Fills up slowly
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS = 10;
let requestCount = 0;
let windowStart = Date.now();

function checkRateLimit(): boolean {
    const now = Date.now();
    if (now - windowStart > RATE_LIMIT_WINDOW) {
        // Reset window
        windowStart = now;
        requestCount = 0;
    }

    if (requestCount >= MAX_REQUESTS) {
        return false;
    }

    requestCount++;
    return true;
}

export async function generateEventSummary(title: string, body: string, type: 'pr' | 'issue'): Promise<{ summary: string; impact: string }> {
    if (!genAI) {
        // Silent fail if no key, no error for user
        return { summary: title, impact: "Update" };
    }

    // STRICT LIMIT: If we hit our internal cap, skip AI immediately.
    if (!checkRateLimit()) {
        console.warn("[Gemini] Internal Rate Limit Hit. Skipping AI summary.");
        return {
            summary: title, // Fallback to original title
            impact: "Update"
        };
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
    You are an expert engineering manager. Summarize this GitHub ${type} for a daily executive digest.
    
    Input:
    Title: ${title}
    Body: ${body || "No description provided."}
    
    Requirements:
    1. Summary: A single, punchy sentence explaining the *value* or *change* (not just repeating the title). Max 20 words.
    2. Impact: A strict 2-3 word tag describing the business/technical impact (e.g. "Performance Boost", "Security Fix", "Tech Debt", "New Feature").
    
    Output JSON format only:
    {
      "summary": "...",
      "impact": "..."
    }
    `;

    try {
        const result = await model.generateContent(prompt);
        const response = result.response;
        // Clean up markdown block if present
        const text = response.text().replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(text);
    } catch (error) {
        console.error("Gemini Generation Failed:", error);
        return {
            summary: title,
            impact: "Update"
        };
    }
}
