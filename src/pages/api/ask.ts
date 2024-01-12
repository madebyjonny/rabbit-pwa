import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage } from "@langchain/core/messages";
import type { APIRoute } from "astro";

const chat = new ChatOpenAI({
  temperature: 0.9,
});

export const POST: APIRoute = async ({ request }) => {
  if (request.headers.get("Content-Type") === "application/json") {
    const { query } = await request.json();

    const message = new HumanMessage({
      content: [
        {
          type: "text",
          text: query,
        },
      ],
    });

    const res = await chat.invoke([message]);

    return new Response(
      JSON.stringify({
        answer: res.content,
      }),
      {
        status: 200,
      },
    );
  }
  return new Response(null, { status: 400 });
};
