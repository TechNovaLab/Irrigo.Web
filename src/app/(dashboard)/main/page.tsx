"use client";

import React from "react";
import CropFrom from "./CropForm";
import { TableProvider } from "@/presentation/contexts/table/TableContext";

const Dashboard = () => {
  return (
    <>
      <TableProvider>
        <CropFrom />
      </TableProvider>
    </>
  );
};

export default Dashboard;
