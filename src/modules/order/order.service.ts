import { prisma } from "../../lib/prisma";

const hasOrdered = async (userId: string, mealId: string) => {
  return await prisma.orderItem.findFirst({
    where: {
      mealId: mealId,
      order: {
        customerId: userId,
      },
    },
    select: {
      mealId: true,
    },
  });
};

const getOrders = async () => {
  return await prisma.order.findMany({
    include: {
      orderItems: true,
    },
  });
};

const getOrderWithUserId = async (userID: string) => {
  return await prisma.order.findMany({
    where: {
      customerId: userID,
    },
  });
};

type TOrderData = {
  delivaryAddress: string;
  longitude?: number;
  latitude?: number;

  customerId: string;

  orderItems: {
    mealId: string;
    quantity: number;
    price: number;
  }[];
};

const createOrder = async (data: TOrderData, customerId: string) => {
  const totalPrice = data.orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return await prisma.order.create({
    data: {
      delivaryAddress: data.delivaryAddress,
      longitude: data.longitude ?? null,
      latitude: data.latitude ?? null,
      totalPrice,
      customerId,
      orderItems: {
        create: data.orderItems.map((item) => ({
          price: item.price,
          quantity: item.quantity,
          mealId: item.mealId,
        })),
      },
    },
  });
};

export const OrderService = {
  hasOrdered,
  getOrders,
  getOrderWithUserId,
  createOrder
};
