"use client";
import { NeoTypography } from "@uninus/ui-atoms";
import { FC, ReactElement } from "react";

const ErrorPage: FC<{
  error: Error & { digest?: string };
  reset: () => void;
}> = ({ error, reset }): ReactElement => {
  return (
    <div className="w-full">
      <NeoTypography size="caption" color="text-red-500">
        Ada error bang {error.message}
      </NeoTypography>
    </div>
  );
};

export default ErrorPage;
