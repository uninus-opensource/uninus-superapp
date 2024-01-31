import { NeoButton, NeoTypography } from "@uninus/ui-atoms";
import { FC, ReactElement } from "react";

export const LoginModule: FC = (): ReactElement => {
  return (
    <div className="flex flex-col h-full justify-between">
      <div className="flex flex-col">
        <NeoTypography color="text-grey-800" variant="bold" size="title-5">
          Masuk
        </NeoTypography>

        <NeoTypography color="text-grey-400" variant="medium" size="body-1">
          Selamat datang, Silahkan masuk dengan kredensial yang sudah terdaftar
        </NeoTypography>
      </div>

      <span>Ceritanya nanti disini dirender form</span>

      <NeoButton variant="primary">Masuk Sekarang</NeoButton>
    </div>
  );
};
