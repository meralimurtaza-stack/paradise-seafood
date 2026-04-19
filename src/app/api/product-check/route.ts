import Anthropic from "@anthropic-ai/sdk";
import productsData from "../../../../products.json";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Build a condensed product catalogue string
function buildCatalogue(): string {
  const products = productsData.products as Array<{
    id: string;
    name: string;
    slug: string;
    category: string;
    subcategory: string;
    format: string;
    size_grade: string;
    unit: string;
    origin: string;
    certifications: string[];
    fresh_or_frozen: string;
    case_packing: string;
  }>;

  // Group by category for readability
  const grouped: Record<string, typeof products> = {};
  for (const p of products) {
    if (!grouped[p.category]) grouped[p.category] = [];
    grouped[p.category].push(p);
  }

  let catalogue = "";
  for (const [cat, prods] of Object.entries(grouped)) {
    catalogue += `\n## ${cat}\n`;
    for (const p of prods) {
      const certs = p.certifications.length
        ? ` [${p.certifications.join(", ")}]`
        : "";
      catalogue += `- ${p.name} | slug:${p.slug} | ${p.format} | ${p.size_grade} | ${p.unit} | ${p.origin} | ${p.fresh_or_frozen}${certs}\n`;
    }
  }
  return catalogue;
}

const CATALOGUE = buildCatalogue();

const SYSTEM_PROMPT = `You are Paradise Seafood's product assistant. You help chefs, hotel buyers, and caterers find the right products from our catalogue. You are knowledgeable, helpful, and speak like an experienced seafood professional.

RULES:
- Search the product catalogue below to answer questions
- IMPORTANT: Your response must be in TWO parts separated by the exact delimiter |||PRODUCTS_JSON|||
- Part 1 (before delimiter): Your conversational message as plain text ONLY — no markdown, no bold (**), no italic (*), no bullet lists, no numbered lists. Just natural conversational sentences. Keep it concise (2-3 sentences max). Be helpful and professional.
- Part 2 (after delimiter): A JSON object with: { "found": boolean, "type": "product_match" | "dish_suggestion" | "recommendation" | "not_found", "products": [array of matching product objects from the catalogue], "whatsappQuery": string (only if not found) }
- For product searches: return all matching products with a helpful message
- For dish names: identify the dish and suggest the raw ingredients from our catalogue
- For recommendations: understand what they need and suggest appropriate products with reasoning
- For quantity questions: calculate based on standard portion sizes (150-200g per person for fish mains)
- If nothing matches: set found to false and include the original query in whatsappQuery field so we can pre-fill a WhatsApp message
- Never make up products that are not in the catalogue
- Maximum 8 products in the response unless they specifically ask for more
- Each product in the products array MUST have: name, slug (copy exactly from catalogue), format, size_grade, unit, origin, certifications, fresh_or_frozen, category (copy exactly from catalogue e.g. "Fresh Fish" not "Fish"), subcategory (copy exactly from catalogue e.g. "Monkfish" not "monkfish")

Example response format:
Great choice! We have several sashimi-grade options for you. Here are our top picks for the freshest cuts.|||PRODUCTS_JSON|||{"found":true,"type":"product_match","products":[...]}

PRODUCT CATALOGUE:
${CATALOGUE}`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const query = body.query?.trim();

    if (!query) {
      return new Response(JSON.stringify({ error: "Query is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return new Response(
        JSON.stringify({ error: "API key not configured" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const stream = anthropic.messages.stream({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 2048,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: query,
        },
      ],
    });

    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        let fullText = "";

        try {
          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              const chunk = event.delta.text;
              fullText += chunk;

              // Check if we've hit the delimiter yet
              const delimiterIndex = fullText.indexOf("|||PRODUCTS_JSON|||");

              if (delimiterIndex === -1) {
                // Still in the message part — stream the chunk
                controller.enqueue(
                  encoder.encode(
                    `data: ${JSON.stringify({ type: "text", text: chunk })}\n\n`
                  )
                );
              }
              // Once we hit the delimiter, stop streaming text (JSON is buffered)
            }
          }

          // Parse the structured data from after the delimiter
          const delimiterIndex = fullText.indexOf("|||PRODUCTS_JSON|||");
          let productsData = {
            found: false,
            type: "not_found",
            products: [],
            whatsappQuery: query,
          };

          if (delimiterIndex !== -1) {
            const jsonPart = fullText
              .slice(delimiterIndex + "|||PRODUCTS_JSON|||".length)
              .trim();
            try {
              const cleaned = jsonPart
                .replace(/```json\n?/g, "")
                .replace(/```\n?/g, "")
                .trim();
              productsData = JSON.parse(cleaned);
            } catch {
              // JSON parse failed, use defaults
            }
          }

          // Send the final structured data
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ type: "done", data: productsData })}\n\n`
            )
          );

          // Log the query
          console.log(
            JSON.stringify({
              timestamp: new Date().toISOString(),
              query,
              responseType: productsData.type,
              productsReturned:
                (productsData.products as unknown[])?.length || 0,
            })
          );

          controller.close();
        } catch (err) {
          console.error("Stream error:", err);
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ type: "error", error: "Stream failed" })}\n\n`
            )
          );
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error: unknown) {
    console.error("Product check error:", error);
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
