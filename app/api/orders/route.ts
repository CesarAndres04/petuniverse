export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const OrderItemSchema = z.object({
  productId:   z.string(),
  productName: z.string(),
  quantity:    z.number().int().min(1),
  unitPrice:   z.number().positive(),
});

const AddressSchema = z.object({
  name:   z.string().min(2),
  street: z.string().min(5),
  city:   z.string().min(2),
  state:  z.string().min(2),
  zip:    z.string().min(4),
  phone:  z.string().min(8),
});

const OrderSchema = z.object({
  userId:          z.string().optional(),
  items:           z.array(OrderItemSchema).min(1, "El carrito está vacío"),
  subtotal:        z.number().positive(),
  shipping:        z.number().min(0),
  discount:        z.number().min(0).optional(),
  total:           z.number().positive(),
  shippingAddress: AddressSchema,
  couponCode:      z.string().optional(),
});

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Cuerpo de solicitud inválido" }, { status: 400 });
  }

  const parsed = OrderSchema.safeParse(body);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "Datos de orden inválidos";
    return NextResponse.json({ success: false, error: firstError }, { status: 400 });
  }

  const data = parsed.data;
  const orderNumber = `PU-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 999999)).padStart(6, "0")}`;
  const estimatedDelivery = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);

  // Resuelve userId: usa el enviado o busca el demo user como fallback
  let userId = data.userId;
  if (!userId) {
    const demo = await prisma.user.findUnique({ where: { email: "demo@petuniverse.mx" } });
    userId = demo?.id ?? "anonymous";
  }

  // Si no hay user real en DB, crear orden sin relación de usuario
  let order;
  try {
    order = await prisma.order.create({
      data: {
        orderNumber,
        userId,
        status:           "CONFIRMED",
        subtotal:         data.subtotal,
        discount:         data.discount ?? 0,
        shipping:         data.shipping,
        tax:              0,
        total:            data.total,
        shippingAddress:  data.shippingAddress,
        couponCode:       data.couponCode,
        estimatedDelivery,
        items: {
          create: await Promise.all(
            data.items.map(async (item) => {
              const product = await prisma.product.findUnique({ where: { id: item.productId } });
              return {
                productId: product?.id ?? item.productId,
                quantity:  item.quantity,
                unitPrice: item.unitPrice,
                total:     item.unitPrice * item.quantity,
              };
            })
          ),
        },
      },
    });
  } catch {
    // Fallback si el productId no existe en DB (modo demo con MOCK_PRODUCTS)
    order = await prisma.order.create({
      data: {
        orderNumber,
        userId,
        status:           "CONFIRMED",
        subtotal:         data.subtotal,
        discount:         data.discount ?? 0,
        shipping:         data.shipping,
        tax:              0,
        total:            data.total,
        shippingAddress:  data.shippingAddress,
        couponCode:       data.couponCode,
        estimatedDelivery,
      },
    });
  }

  return NextResponse.json(
    {
      success: true,
      data: {
        orderId:           order.id,
        orderNumber:       order.orderNumber,
        estimatedDelivery: order.estimatedDelivery?.toISOString(),
      },
    },
    { status: 201 }
  );
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  const orders = await prisma.order.findMany({
    where: userId ? { userId } : {},
    include: { items: { include: { product: true } } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ success: true, data: orders });
}
