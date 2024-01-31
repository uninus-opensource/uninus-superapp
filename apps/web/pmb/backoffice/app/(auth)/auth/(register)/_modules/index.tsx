import { NeoButton, NeoTypography } from "@uninus/ui-atoms";

export const RegisterModule = () => {
  return (
    <div className="flex flex-col h-full justify-between">
      <div className="flex flex-col">
        <NeoTypography color="text-grey-800" variant="bold" size="title-5">
          Daftar
        </NeoTypography>

        <NeoTypography color="text-grey-400" variant="medium" size="body-1">
          Silahkan lengkapi data berikut, untuk melanjutkan proses pendaftaran
        </NeoTypography>
      </div>

      <span>Ceritanya nanti disini dirender form</span>

      <NeoButton variant="primary">Daftar Sekarang</NeoButton>
    </div>
  );
};
