export const formatDate = (inputDate: string) => {
  const dateObject = new Date(inputDate);

  const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const formattedDate = {
    day: dateObject.getDate(),
    month: monthNames[dateObject.getMonth()],
    year: dateObject.getFullYear(),
  };

  return `${formattedDate.day} ${formattedDate.month} ${formattedDate.year}`;
};
