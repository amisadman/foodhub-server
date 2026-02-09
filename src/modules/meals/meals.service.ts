import { Meal } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const getMeals = async () => {
  return await prisma.meal.findMany({
    include: {
      provider: {
        select: {
          name: true,
          location: true,
        },
      },
    },
  });
};

const createMeal = async (
  data: Omit<Meal, "id" | "createdAt" | "updatedAt" | "providerId">,
  providerId: string,
) => {
  return await prisma.meal.create({
    data: {
      ...data,
      providerId,
    },
  });
};

export const MealsService = {
  getMeals,
  createMeal,
};
