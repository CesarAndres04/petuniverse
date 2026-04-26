import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed de PetUniverse...");

  // ─── Productos ────────────────────────────────────────────────────
  const products = await Promise.all([
    prisma.product.upsert({
      where: { slug: "premio-organico-sin-gluten" },
      update: {},
      create: {
        name: "Premio Orgánico Sin Gluten",
        slug: "premio-organico-sin-gluten",
        description: "Snack artesanal elaborado con ingredientes 100% orgánicos certificados. Sin gluten, sin conservadores artificiales.",
        shortDescription: "Snack natural orgánico, libre de gluten y conservadores",
        price: 189, comparePrice: 249, currency: "MXN",
        category: "TREATS",
        targetSpecies: ["DOG"],
        energyLevels: ["ACTIVE", "ATHLETE"],
        allergenFree: ["gluten", "pollo", "soya"],
        tags: ["orgánico", "sin-gluten", "natural"],
        sku: "TRT-001", stock: 45, isActive: true, isFeatured: true,
        salesCount: 1240, rating: 4.9, reviewCount: 312,
      },
    }),
    prisma.product.upsert({
      where: { slug: "suplemento-omega-3-premium" },
      update: {},
      create: {
        name: "Suplemento Omega-3 Premium",
        slug: "suplemento-omega-3-premium",
        description: "Aceite de salmón de alta pureza para piel brillante y articulaciones saludables.",
        shortDescription: "Aceite de salmón puro para piel y articulaciones",
        price: 349, comparePrice: 450, currency: "MXN",
        category: "SUPPLEMENTS",
        targetSpecies: ["DOG", "CAT"],
        energyLevels: ["SEDENTARY", "ACTIVE", "ATHLETE"],
        allergenFree: ["gluten", "lactosa"],
        tags: ["omega-3", "piel", "articulaciones"],
        sku: "SUP-001", stock: 28, isActive: true, isFeatured: true,
        salesCount: 876, rating: 4.8, reviewCount: 198,
      },
    }),
    prisma.product.upsert({
      where: { slug: "calming-drops-manzanilla" },
      update: {},
      create: {
        name: "Calming Drops Manzanilla",
        slug: "calming-drops-manzanilla",
        description: "Suplemento natural con manzanilla y valeriana. Alivia la ansiedad por pirotecnia y tormentas.",
        shortDescription: "Alivio natural para ansiedad por pirotecnia y tormentas",
        price: 389, comparePrice: 489, currency: "MXN",
        category: "CALMING",
        targetSpecies: ["DOG", "CAT"],
        energyLevels: ["SEDENTARY", "ACTIVE", "ATHLETE"],
        allergenFree: ["gluten", "pollo"],
        tags: ["calming", "ansiedad", "natural"],
        sku: "CAL-001", stock: 21, isActive: true, isFeatured: true,
        salesCount: 1100, rating: 4.8, reviewCount: 276,
      },
    }),
    prisma.product.upsert({
      where: { slug: "alimento-grain-free-salmon" },
      update: {},
      create: {
        name: "Alimento Grain-Free Salmón",
        slug: "alimento-grain-free-salmon",
        description: "Alimento premium sin granos con salmón de Alaska como primer ingrediente. 70% proteína animal.",
        shortDescription: "70% proteína de salmón de Alaska. Sin granos ni pollo",
        price: 589, comparePrice: 720, currency: "MXN",
        category: "FOOD",
        targetSpecies: ["DOG"],
        energyLevels: ["ACTIVE", "ATHLETE"],
        allergenFree: ["gluten", "maíz", "trigo", "soya", "pollo"],
        tags: ["grain-free", "premium", "salmón"],
        sku: "FOO-001", stock: 19, isActive: true, isFeatured: true,
        salesCount: 965, rating: 4.9, reviewCount: 224,
      },
    }),
    prisma.product.upsert({
      where: { slug: "juguete-kong-extreme-xl" },
      update: {},
      create: {
        name: "Juguete Kong Extreme XL",
        slug: "juguete-kong-extreme-xl",
        description: "Juguete ultra-resistente de hule natural para perros con mucha energía.",
        shortDescription: "Juguete rellenable ultra-resistente para perros activos",
        price: 299, currency: "MXN",
        category: "TOYS",
        targetSpecies: ["DOG"],
        energyLevels: ["ACTIVE", "ATHLETE"],
        allergenFree: [],
        tags: ["juguete", "resistente", "activo"],
        sku: "TOY-001", stock: 15, isActive: true, isFeatured: false,
        salesCount: 654, rating: 4.7, reviewCount: 143,
      },
    }),
    prisma.product.upsert({
      where: { slug: "shampoo-natural-avena" },
      update: {},
      create: {
        name: "Shampoo Natural de Avena",
        slug: "shampoo-natural-avena",
        description: "Shampoo hipoalergénico con avena coloidal, aloe vera y aceite de coco. Sin sulfatos.",
        shortDescription: "Hipoalergénico con avena y aloe. Sin sulfatos ni parabenos",
        price: 249, currency: "MXN",
        category: "GROOMING",
        targetSpecies: ["DOG", "CAT"],
        energyLevels: ["SEDENTARY", "ACTIVE", "ATHLETE"],
        allergenFree: ["gluten", "sulfatos", "parabenos"],
        tags: ["natural", "hipoalergénico", "grooming"],
        sku: "GRM-001", stock: 32, isActive: true, isFeatured: false,
        salesCount: 789, rating: 4.6, reviewCount: 201,
      },
    }),
    prisma.product.upsert({
      where: { slug: "cama-ortopedica-memory-foam" },
      update: {},
      create: {
        name: "Cama Ortopédica Memory Foam",
        slug: "cama-ortopedica-memory-foam",
        description: "Cama premium con espuma de memoria ortopédica. Funda removible y lavable en lavadora.",
        shortDescription: "Espuma de memoria ortopédica con funda lavable",
        price: 1299, comparePrice: 1699, currency: "MXN",
        category: "ACCESSORIES",
        targetSpecies: ["DOG", "CAT"],
        energyLevels: ["SEDENTARY", "ACTIVE"],
        allergenFree: [],
        tags: ["ortopédica", "premium", "descanso"],
        sku: "ACC-001", stock: 8, isActive: true, isFeatured: true,
        salesCount: 421, rating: 4.9, reviewCount: 87,
      },
    }),
    prisma.product.upsert({
      where: { slug: "vitaminas-salud-articular" },
      update: {},
      create: {
        name: "Vitaminas Salud Articular",
        slug: "vitaminas-salud-articular",
        description: "Suplemento con glucosamina, condroitina y MSM para articulaciones sanas y movilidad óptima.",
        shortDescription: "Glucosamina y condroitina para articulaciones sanas",
        price: 459, comparePrice: 549, currency: "MXN",
        category: "HEALTH",
        targetSpecies: ["DOG", "CAT"],
        energyLevels: ["SEDENTARY", "ACTIVE", "ATHLETE"],
        allergenFree: ["gluten", "soya"],
        tags: ["articulaciones", "salud", "suplemento"],
        sku: "HLT-001", stock: 25, isActive: true, isFeatured: false,
        salesCount: 563, rating: 4.7, reviewCount: 134,
      },
    }),
  ]);

  // ─── Usuario demo ─────────────────────────────────────────────────
  const passwordHash = await bcrypt.hash("demo123", 10);

  const user = await prisma.user.upsert({
    where: { email: "demo@petuniverse.mx" },
    update: {},
    create: {
      email: "demo@petuniverse.mx",
      name: "César Andrés",
      passwordHash,
      role: "CLIENT",
      totalSpent: 4230,
      orderCount: 12,
      ltv: 4230,
    },
  });

  // ─── Usuario admin ────────────────────────────────────────────────
  const adminHash = await bcrypt.hash("admin123", 10);
  await prisma.user.upsert({
    where: { email: "admin@petuniverse.mx" },
    update: {},
    create: {
      email: "admin@petuniverse.mx",
      name: "Admin PetUniverse",
      passwordHash: adminHash,
      role: "ADMIN",
      totalSpent: 0,
      orderCount: 0,
      ltv: 0,
    },
  });

  // ─── Perfil de mascota demo ───────────────────────────────────────
  await prisma.petProfile.upsert({
    where: { id: "pet_demo_copernico" },
    update: {},
    create: {
      id: "pet_demo_copernico",
      userId: user.id,
      name: "Copérnico",
      species: "DOG",
      breed: "Golden Retriever",
      birthDate: new Date("2021-03-15"),
      adoptionDate: new Date("2021-05-09"),
      weight: 28.5,
      gender: "MALE",
      energyLevel: "ACTIVE",
      foodAllergies: ["pollo", "gluten"],
      foodPreferences: ["grain-free", "orgánico"],
      fears: ["FIREWORKS", "THUNDERSTORMS"],
      isNeutered: true,
    },
  });

  console.log(`✅ Seed completado:`);
  console.log(`   ${products.length} productos creados`);
  console.log(`   demo@petuniverse.mx / demo123`);
  console.log(`   admin@petuniverse.mx / admin123`);
  console.log(`   Mascota: Copérnico (Golden Retriever)`);
}

main()
  .catch((e) => {
    console.error("❌ Error en seed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
