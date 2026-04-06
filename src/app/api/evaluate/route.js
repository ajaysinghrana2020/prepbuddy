import { NextResponse } from "next/server";

export async function POST(request) {
  const { question, topic, answer } = await request.json();

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { feedback: "Error: GEMINI_API_KEY not found in .env.local" },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are an interview evaluator for a Java developer with 3.5 years of experience. 

Topic: ${topic}
Question: ${question}
Candidate's Answer: ${answer}

Evaluate this answer as if it were given in a real interview. Give:
1. Score (out of 10)
2. What's good about the answer
3. What's missing or could be improved
4. A brief ideal answer hint

Keep your response concise and helpful. Be encouraging but honest.`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    console.log("Gemini response status:", response.status);
    console.log("Gemini data:", JSON.stringify(data).slice(0, 500));

    if (data.error) {
      return NextResponse.json(
        { feedback: "Gemini Error: " + data.error.message },
        { status: 500 }
      );
    }

    const feedback = data.candidates[0].content.parts[0].text;
    return NextResponse.json({ feedback });
  } catch (error) {
    console.log("Catch error:", error.message);
    return NextResponse.json(
      { feedback: "Error: " + error.message },
      { status: 500 }
    );
  }
}