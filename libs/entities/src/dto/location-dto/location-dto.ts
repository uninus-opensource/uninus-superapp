export class Location {
  id?: number;
  province!: string;
  city!: string;
  district!: string;
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
