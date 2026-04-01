import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import productsData from "../../../../products.json";
import speciesData from "../../../../species-data.json";

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
- Return your response as JSON only, no markdown, no code fences: { "found": boolean, "type": "product_match" | "dish_suggestion" | "recommendation" | "not_found", "message": string, "products": [array of matching product objects from the catalogue], "whatsappQuery": string (only if not found) }
- For product searches: return all matching products with a helpful message
- For dish names: identify the dish and suggest the raw ingredients from our catalogue
- For recommendations: understand what they need and suggest appropriate products with reasoning
- For quantity questions: calculate based on standard portion sizes (150-200g per person for fish mains)
- If nothing matches: set found to false and include the original query in whatsappQuery field so we can pre-fill a WhatsApp message
- Never make up products that aren't in the catalogue
- Be conversational but concise in your message field
- Maximum 8 products in the response unless they specifically ask for more
- Each product in the products array MUST have: name, slug (copy exactly from catalogue), format, size_grade, unit, origin, certifications, fresh_or_frozen, category (copy exactly from catalogue e.g. "Fresh Fish" not "Fish"), subcategory (copy exactly from catalogue e.g. "Monkfish" not "monkfish")

PRODUCT CATALOGUE:
${CATALOGUE}`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const query = body.query?.trim();

    if (!query) {
      return NextResponse.json(
        { error: "Query is required" },
        { status: 400 }
      );
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2048,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: query,
        },
      ],
    });

    // Extract text content
    const textBlock = message.content.find((b) => b.type === "text");
    const responseText = textBlock ? textBlock.text : "";

    // Parse JSON response
    let parsed;
    try {
      // Strip any markdown code fences if present
      const cleaned = responseText
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .trim();
      parsed = JSON.parse(cleaned);
    } catch {
      parsed = {
        found: false,
        type: "not_found",
        message: responseText,
        products: [],
      };
    }

    // Log the query
    console.log(
      JSON.stringify({
        timestamp: new Date().toISOString(),
        query,
        responseType: parsed.type,
        productsReturned: parsed.products?.length || 0,
      })
    );

    return NextResponse.json(parsed);
  } catch (error: unknown) {
    console.error("Product check error:", error);
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
