// --- Heuristic (Keyword) Classifier ---
// Replaces the heavy ML model to prevent native module crashes (onnxruntime) on Windows.
// This is faster, synchronous, and 100% stable.

export interface ClassificationResult {
    label: string;
    score: number;
    reason: string;
}

const KEYWORDS: Record<string, string[]> = {
    'security fix': ['security', 'vulnerability', 'exploit', 'cve', 'audit', 'token', 'secret', 'breach'],
    'build failure': ['fail', 'error', 'crash', 'exception', 'stack', 'trace', 'broken', 'timeout', 'ci/cd'],
    'dependency update': ['bump', 'upgrade', 'dependency', 'npm', 'yarn', 'package', 'library', 'renovate', 'dependabot'],
    'bug fix': ['fix', 'bug', 'patch', 'resolve', 'issue', 'incorrect', 'crash', 'glitch'],
    'performance': ['slow', 'lag', 'optimize', 'speed', 'memory', 'leak', 'faster', 'latency'],
    'refactoring': ['refactor', 'clean', 'structure', 'organize', 'rewrite', 'move'],
    'documentation': ['docs', 'readme', 'comment', 'typo', 'guide', 'manual'],
    'new feature': ['feat', 'add', 'new', 'implement', 'create', 'allow', 'support']
};

export async function interpretEvent(text: string): Promise<ClassificationResult> {
    const lowerText = text.toLowerCase();

    // Check strict categories first (Security > Build > Bug)
    for (const [label, patterns] of Object.entries(KEYWORDS)) {
        if (patterns.some(pattern => lowerText.includes(pattern))) {
            return {
                label,
                score: 0.9, // High confidence matches
                reason: `Detected keywords related to "${label}"`
            };
        }
    }

    // Default fallback
    return {
        label: 'general update',
        score: 0.5,
        reason: 'General activity'
    };
}
// kept getClassifier for interface compatibility if needed, but it's unused now.
export async function getClassifier() { return null; }
