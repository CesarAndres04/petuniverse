import { NextRequest, NextResponse } from "next/server";
import { MOCK_PET } from "@/lib/mock-data";

export async function GET(_req: NextRequest) {
  // TODO: validar sesión y retornar mascotas del usuario autenticado
  return NextResponse.json({ success: true, data: [MOCK_PET] });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  // TODO: validar con Zod y persistir en DB via prisma.petProfile.create()
  return NextResponse.json(
    { success: true, data: { id: "new_pet", ...body } },
    { status: 201 }
  );
}
