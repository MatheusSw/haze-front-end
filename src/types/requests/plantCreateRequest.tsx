interface PlantCreateRequest {
  strain: string;
  lifetime: number;
  state: string;
  cloned_from?: string;
}

export default PlantCreateRequest;
