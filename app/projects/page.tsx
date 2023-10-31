import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Form from "@/components/form";
import Link from "next/link";

import { Trash } from "lucide-react";

import { createProject, deleteProject } from "@/lib/actions";
import prisma from "@/lib/prisma";

const projectForm = {
  name: "name",
  label: "Enter a name for the project",
  button: "Add Project",
};

export default async function ProjectsPage() {
  const data = await prisma.project.findMany({
    include: {
      updates: true,
    },
  });

  return (
    <main className="min-h-screen flex-col p-24 space-y-6">
      <h1 className="text-3xl">Projects</h1>
      <Form inputs={projectForm} action={createProject} />
      <Table>
        <TableCaption>A list of your projects.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Date Created</TableHead>
            <TableHead>Date Updated</TableHead>
            <TableHead className="text-right">Number of Updates</TableHead>
            <TableHead>Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="font-medium">
                <Link href={`/projects/${row.id}`} className="underline">
                  {row.name}
                </Link>
              </TableCell>
              <TableCell>{row?.createdAt.toDateString()}</TableCell>
              <TableCell>{row?.updatedAt.toDateString()}</TableCell>
              <TableCell className="text-right">
                {row?.updates.length}
              </TableCell>
              <TableCell>
                <form action={deleteProject} method="POST">
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
