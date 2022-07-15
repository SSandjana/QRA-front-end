import {UploadDocDefinitie} from "./upload-doc-definitie";

export interface ConfigUploadDocument {
  id: number;
  uploadDocument: UploadDocDefinitie;
  verplicht: boolean;
  zichtbaar: boolean;
  aantal: number;
  geldigheidDagen: number;
  infoText: string;
  notes: string;
}
