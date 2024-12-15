import { StatusCode } from "../models/Status";

interface ErrorResponseData {
  type: string;
  title: string;
  status: number;
  detail: string;
  traceId: string;
}

export class ApplicationError extends Error {
  type: string;
  title: string;
  status: StatusCode;
  detail: string;
  traceId: string;
  constructor(data: ErrorResponseData) {
    super(data.detail);
    this.type = data.type;
    this.title = data.title;
    this.status = data.status;
    this.detail = data.detail;
    this.traceId = data.traceId;
  }
}
