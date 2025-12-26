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
    await enqueue(); // Wait for free slot

    try {
        if (!summarizer) {
            console.log('[AI] Loading local summarization model (Xenova/distilbart-cnn-6-6)...');
            // 'summarization' task, using a quantized model for speed and low memory
            summarizer = await pipeline('summarization', 'Xenova/distilbart-cnn-6-6');
        }

        const input = `Title: ${title}. Body: ${body || ''}`;

        // Truncate to avoid excessive token usage
        const cleanInput = input.substring(0, 1024);

        const output = await summarizer(cleanInput, {
            max_new_tokens: 30, // Keep it punchy
            min_length: 10,
            do_sample: false
        });

        // Heuristic mapping for Impact, caller should prefer classifier
        return {
            summary: output[0]?.summary_text || "Automated summary unavailable.",
            impact: "Update"
        };

    } catch (error) {
        console.error('[AI] Local summarization failed:', error);
        return {
            summary: title,
            impact: "Update"
        };
    } finally {
        release(); // Always release slot
    }
}
