import { PlantStage } from "../enums/PlantStage";

export type Cluster = {
  id: string;
  created_at: string;
  location: string;
  name: string;
  state?: string | undefined;
  updated_at: string;
};
