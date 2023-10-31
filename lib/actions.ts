import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createProject(formData: FormData) {
  "use server";
  await prisma.project.create({
    data: {
      name: formData.get("name") as string,
    },
  });

  revalidatePath("/projects");
}

export async function deleteProject(formData: FormData) {
  "use server";
  await prisma.project.delete({
    where: {
      id: formData.get("id") as string,
    },
  });

  revalidatePath("/projects");
}

export async function createUpdate(formData: FormData) {
  "use server";
  await prisma.update.create({
    data: {
      description: formData.get("description") as string,
      project: {
        connect: {
          id: formData.get("id") as string,
        },
      },
    },
  });

  revalidatePath("/projects");
}

export async function deleteUpdate(formData: FormData) {
  "use server";
  await prisma.update.delete({
    where: {
      id: formData.get("id") as string,
    },
  });

  revalidatePath("/projects");
}
