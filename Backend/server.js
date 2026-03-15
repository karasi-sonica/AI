const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const SYSTEM_PROMPT = `
You are an AI Data Agent. Your goal is to analyze data and provide structured responses.
Users will ask questions about data. You must respond with a JSON object.

The responses MUST follow this exact JSON structure:
{
  "type": "text" | "chart" | "flowchart",
  "data": string | array,
  "chartType": "bar" | "line" | "pie" (only if type is "chart")
}

Constraints:
1. If type is "text", "data" must be a markdown formatted string.
2. If type is "chart", "data" must be an array of objects, each with "name" and "value" keys (e.g. [{"name": "Jan", "value": 100}, {"name": "Feb", "value": 150}]).
3. If type is "flowchart", "data" must be a valid mermaid.js diagram string (e.g. "graph TD\\n  A --> B").
4. Always prioritize visualization (charts/flowcharts) if the query implies comparison, trends, or processes.
5. If the specific data isn't provided in the prompt, generate realistic and representative sample data for the visualization.

IMPORTANT: Return ONLY the raw JSON object. Do not include markdown code blocks or any other text in your response.
`;

app.post('/chat', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const prompt = `${SYSTEM_PROMPT}\n\nUser Question: ${message}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean response text in case Gemini wraps it in markdown code blocks
    const jsonString = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    try {
      const jsonData = JSON.parse(jsonString);
      res.json(jsonData);
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError, 'Raw Text:', text);
      // Fallback if AI fails to return valid JSON
      res.json({
        type: 'text',
        data: text
      });
    }
  } catch (error) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ error: 'Failed to process request with AI' });
  }
});

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
