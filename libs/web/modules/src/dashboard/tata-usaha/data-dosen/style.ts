const statusStyle: Record<string, string> = {
  Aktif: "bg-green-50 text-primary-green",
  "Tidak Aktif": "bg-error-100 text-error 600",
  Cuti: "bg-orange-1 text-orange-2",
  MBKM: "bg-blue text-grayscale-950",
};

export const getStatusStyle = (status: string): string => {
  return statusStyle[status] || "";
};
