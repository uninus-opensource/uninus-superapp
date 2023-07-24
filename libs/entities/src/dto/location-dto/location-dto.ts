export class Location {
  id?: string;
  name!: string;
}

export interface LocationApiResponse {
  status: string;
  message: string;
  data: LocationData[];
}

interface LocationData {
  id: string;
  name: string;
}
