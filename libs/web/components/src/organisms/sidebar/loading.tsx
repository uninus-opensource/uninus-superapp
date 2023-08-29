import { FC, Fragment, ReactElement } from "react";

export const Loading: FC = (): ReactElement => {
  return (
    <Fragment>
      <li className="bg-grayscale-2 animate-pulse h-12 w-[15vw] rounded-md mt-3"></li>
      <li className="bg-grayscale-2 animate-pulse h-12 w-[15vw] rounded-md mt-2"></li>
      <li className="bg-grayscale-2 animate-pulse h-12 w-[15vw] rounded-md mt-2"></li>
      <li className="bg-grayscale-2 animate-pulse h-12 w-[15vw] rounded-md mt-2"></li>
    </Fragment>
  );
};
