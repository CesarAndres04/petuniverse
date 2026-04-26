import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

const BodySchema = z.object({
  name:         z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email:        z.string().email("Correo inválido"),
  password:     z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  petName:      z.string().min(1, "El nombre de tu mascota es requerido"),
  species:      z.string().min(1, "Selecciona una especie"),
  breed:        z.string().optional(),
  birthDate:    z.string().optional(),
  adoptionDate: z.string().optional(),
  weight:       z.string().optional(),
  gender:       z.string().optional(),
  energyLevel:  z.string().optional(),
  allergies:    z.string().optional(),
  preferences:  z.string().optional(),
  fears:        z.array(z.string()).optional(),
  neutered:     z.boolean().optional(),
  photoUrl:     z.string().nullable().optional(),
});

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Cuerpo de solicitud inválido" }, { status: 400 });
  }

  const parsed = BodySchema.safeParse(body);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "Datos inválidos";
    return NextResponse.json({ success: false, error: firstError }, { status: 400 });
  }

  const data = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email: data.email } });
  if (existing) {
    return NextResponse.json(
      { success: false, error: "Este correo ya está registrado" },
      { status: 409 }
    );
  }

  const passwordHash = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      email:        data.email,
      name:         data.name,
      passwordHash,
      role:         "CLIENT",
      pets: {
        create: {
          name:            data.petName,
          species:         data.species as any,
          breed:           data.breed ?? undefined,
          birthDate:       data.birthDate ? new Date(data.birthDate) : undefined,
          adoptionDate:    data.adoptionDate ? new Date(data.adoptionDate) : undefined,
          weight:          data.weight ? parseFloat(data.weight) : undefined,
          gender:          data.gender as any ?? undefined,
          energyLevel:     (data.energyLevel as any) ?? "ACTIVE",
          foodAllergies:   data.allergies
            ? data.allergies.split(",").map((a) => a.trim()).filter(Boolean)
            : [],
          foodPreferences: data.preferences
            ? data.preferences.split(",").map((p) => p.trim()).filter(Boolean)
            : [],
          fears:           (data.fears ?? []) as any,
          isNeutered:      data.neutered ?? false,
          profilePhotoUrl: data.photoUrl ?? undefined,
        },
      },
    },
    include: { pets: true },
  });

  return NextResponse.json(
    {
      success: true,
      data: {
        userId:  user.id,
        petId:   user.pets[0]?.id,
        petName: data.petName,
      },
    },
    { status: 201 }
  );
}
