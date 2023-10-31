import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import prisma from "@/lib/prisma";
import Form from "@/components/form";
import { createUpdate, deleteUpdate } from "@/lib/actions";

import { Trash } from "lucide-react";

const updateForm = {
  name: "description",
  label: "Enter a description for the task",
  button: "Add Update",
};

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const data = await prisma.update.findMany({
    where: {
      projectId: id,
    },
    include: {
      project: true,
    },
  });

  console.log(data);

  return (
    <main className="min-h-screen flex-col p-24 space-y-6">
      <h1 className="text-3xl">Tasks</h1>
      <Form inputs={updateForm} action={createUpdate} id={id} />
      <Table>
        <TableCaption>
          {data[0]
            ? `A list of your Tasks for ${data?.[0].project.name}`
            : "No tasks"}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead>Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row?.description}</TableCell>
              <TableCell>
                <form action={deleteUpdate} method="POST">
                  <input type="text" name="id" value={row.id} hidden />
                  <button type="submit">
                    <Trash />
                  </button>
                </form>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
