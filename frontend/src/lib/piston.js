// Code execution service. The original public Piston API became whitelist-only
// in 2026, so the app now uses Judge0 CE by default.

const JUDGE0_API = import.meta.env.VITE_JUDGE0_API_URL || "https://ce.judge0.com";

const LANGUAGE_IDS = {
  javascript: 93, // JavaScript (Node.js 18.15.0)
  python: 92, // Python (3.11.2)
  java: 91, // Java (JDK 17.0.6)
};

/**
 * @param {string} language - programming language
 * @param {string} code - source code to executed
 * @returns {Promise<{success:boolean, output?:string, error?: string}>}
 */
export async function executeCode(language, code) {
  try {
    const languageId = LANGUAGE_IDS[language];

    if (!languageId) {
      return {
        success: false,
        error: `Unsupported language: ${language}`,
      };
    }

    const response = await fetch(`${JUDGE0_API}/submissions?base64_encoded=false&wait=true`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language_id: languageId,
        source_code: code,
      }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        success: false,
        error: data.message || `HTTP error! status: ${response.status}`,
      };
    }

    const output = data.stdout || "";
    const stderr = data.stderr || "";
    const compileOutput = data.compile_output || "";
    const message = data.message || "";

    if (stderr || compileOutput || message || data.status?.id !== 3) {
      return {
        success: false,
        output: output,
        error: stderr || compileOutput || message || data.status?.description || "Code execution failed",
      };
    }

    return {
      success: true,
      output: output || "No output",
    };
  } catch (error) {
    return {
      success: false,
      error: `Failed to execute code: ${error.message}`,
    };
  }
}
