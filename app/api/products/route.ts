import { NextRequest, NextResponse } from "next/server";
import { MOCK_PRODUCTS } from "@/lib/mock-data";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const species  = searchParams.get("species");
  const featured = searchParams.get("featured");

  let products = [...MOCK_PRODUCTS];

  if (category) products = products.filter((p) => p.category === category);
  if (species)  products = products.filter((p) => p.targetSpecies.includes(species as any));
  if (featured === "true") products = products.filter((p) => p.isFeatured);

  return NextResponse.json({ success: true, data: products });
}
