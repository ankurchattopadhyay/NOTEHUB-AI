export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { question } = req.body;

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "meta-llama/llama-3.1-8b-instruct:free",
          messages: [
            {
              role: "user",
              content: question
            }
          ]
        })
      }
    );

    const data = await response.json();

    const answer =
      data.choices?.[0]?.message?.content ||
      JSON.stringify(data);

    res.status(200).json({ answer });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
}
