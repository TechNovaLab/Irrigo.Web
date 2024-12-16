export interface OnCompleteCallback {
  (action: "save" | "cancel", data?: { name: string }): void;
}
