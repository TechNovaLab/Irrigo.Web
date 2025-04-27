"use client";

import React from "react";
import { TableProvider } from "@/presentation/contexts/table/TableContext";
import { CreateCropProvider, CreateCropForm } from "@/presentation/components/features";

export default function Dashboard() {
  return (
    <TableProvider>
      <CreateCropProvider>
        <CreateCropForm />
      </CreateCropProvider>
    </TableProvider>
  );
}
