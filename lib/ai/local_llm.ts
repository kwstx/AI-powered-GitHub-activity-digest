import { pipeline } from '@xenova/transformers';

// Singleton to hold the model pipeline
let summarizer: any = null;

// Simple Concurrency Queue
// Limit to 1 execution at a time to save memory/CPU on shared instances
const MAX_CONCURRENT = 1;
let activeRequests = 0;
const requestQueue: (() => void)[] = [];

const enqueue = (): Promise<void> => {
    return new Promise((resolve) => {
        const run = () => {
            activeRequests++;
            resolve();
        };

        if (activeRequests < MAX_CONCURRENT) {
            run();
        } else {
            requestQueue.push(run);
        }
    });
};

const release = () => {
    activeRequests--;
    if (requestQueue.length > 0) {
        const next = requestQueue.shift();
        if (next) next();
    }
};

export async function generateLocalSummary(title: string, body: string): Promise<{ summary: string; impact: string }> {
    // Timeout Safety: Vercel functions have strict limits. If AI takes > 3s, abort.
    const timeoutPromise = new Promise<{ summary: string; impact: string }>((_, reject) => {
        setTimeout(() => reject(new Error("AI Timeout")), 3000);
    });

    try {
        await enqueue(); // Wait for free slot

        const aiPromise = (async () => {
            if (!summarizer) {
                console.log('[AI] Loading local summarization model (Xenova/distilbart-cnn-6-6)...');
                summarizer = await pipeline('summarization', 'Xenova/distilbart-cnn-6-6');
            }

            const input = `Title: ${title}. Body: ${body || ''}`;
            const cleanInput = input.substring(0, 1024);

            const output = await summarizer(cleanInput, {
                max_new_tokens: 30,
                min_length: 10,
                do_sample: false
            });

            return {
                summary: output[0]?.summary_text || "Automated summary unavailable.",
                impact: "Update"
            };
        })();

        // Race AI against Timeout
        return await Promise.race([aiPromise, timeoutPromise]);

    } catch (error) {
        console.warn('[AI] Summarization skipped (timeout or error):', error);
        return {
            summary: title,
            impact: "Update"
        };
    } finally {
        release(); // Always release slot
    }
}
