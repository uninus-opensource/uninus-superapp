const programStyles: Record<string, string> = {
  Reguler: "bg-green-50 text-primary-green",
  Karyawan: "bg-yellow-200 text-grayscale-900",
  "KIP - K": "bg-success-900 text-grayscale-50",
  "Beasiswa PMDK": "bg-yellow-300 text-grayscale-900",
  "Beasiswa NU": "bg-success-400 text-success-950",
  "Beasiswa NP": "bg-secondary-500 text-success-50",
  "Beasiswa NPD": "bg-success-200 text-success-950",
  "Beasiswa MN": "bg-success-900 text-grayscale-50",
};

const statusStyle: Record<string, string> = {
  Aktif: "bg-green-50 text-primary-green",
  "Tidak Aktif": "bg-error-100 text-error 600",
  Cuti: "bg-orange-1 text-orange-2",
  MBKM: "bg-blue text-grayscale-950",
};

export const getStatusStyle = (status: string): string => {
  return statusStyle[status] || "";
};

export const getProgramStyle = (program: string): string => {
  return programStyles[program] || "";
};
