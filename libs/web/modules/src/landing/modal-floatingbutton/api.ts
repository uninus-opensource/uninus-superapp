import { TGraduationStatusReponse, TGraduationStatusRequest } from "@uninus/entities";
import axios from "axios";

export const CheckRegistration = async (
  payload: TGraduationStatusRequest,
): Promise<TGraduationStatusReponse> => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/student/graduation-status`,
    payload,
  );
  return data;
};
