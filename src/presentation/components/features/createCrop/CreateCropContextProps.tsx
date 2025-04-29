import { Notification } from "@/core/domain/shared/Notification";
import { CompleteCallback } from "@/core/domain/shared/CompleteCallback";
import { CancelCallback } from "@/core/domain/shared/CancelCallback";
import { MenuOption } from "@/presentation/components/ui/Menu";
import React from "react";

export interface CreateCropContextProps {
  rows: any[];
  addRow: () => void;
  deleteRow: (id: number) => void;
  setRows: React.Dispatch<React.SetStateAction<any[]>>;
  setCropTypeSelected: (id: number) => void;
  setPlanterSelected: (id: number) => void;
  setSprinklerGroupSelected: (id: number) => void;
  cropTypeDataSource: MenuOption[];
  planterDataSource: MenuOption[];
  sprinklerGroupDataSource: MenuOption[];
  cropTypeSelected: number | null;
  planterSelected: number | null;
  sprinklerGroupSelected: number | null;
  handleAddCropTypeRecord: (data: { id: number; name: string }) => void;
  handleAddPlanterRecord: (data: { id: number; name: string }) => void;
  handleAddSprinklerGroupRecord: (data: { id: number; name: string }) => void;
  openModal: (type: "cropType" | "planter" | "sprinklerGroup") => void;
  modalState: { type: "cropType" | "planter" | "sprinklerGroup" | null; isOpen: boolean };
  handleModalClose: () => void;
  validateAndSave: (row: any) => Promise<void>;
  toast: Notification | null;
} 