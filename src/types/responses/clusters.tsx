import { PlantStage } from "../enums/PlantStage";
import { Measurement } from "./measurement";

export type Cluster = {
  id: string;
  created_at: string;
  location: string;
  name: string;
  state?: string | undefined;
  updated_at: string;
  measurements: Measurement[];
};
