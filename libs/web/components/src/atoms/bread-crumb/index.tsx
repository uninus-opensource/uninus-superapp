import { FC, ReactElement, Fragment } from "react";
import Link from "next/link";
import { TBreadCrumbProps } from "./types";
import { MdChevronRight } from "react-icons/md";

export const BreadCrumb: FC<TBreadCrumbProps> = ({
  items,
  textColor = "text-primary-green",
  bgColor = "bg-surface-primary",
}): ReactElement => {
  return (
    <div
      className={`grid place-content-start w-full font-bold text-xs md:text-sm ${bgColor}`}
      aria-label="Breadcrumb"
      data-testid="breadcrumb"
    >
      <ol className="flex w-full items-center gap-x-2">
        {items.map((crumb, index) => {
          const isLastItem = index === items.length - 1;
          if (!isLastItem) {
            return (
              <Fragment key={index}>
                <Link
                  href={crumb.link}
                  key={index}
                  className={`inline-flex  font-[600] items-center ${textColor}`}
                >
                  {crumb.name}
                </Link>
                <MdChevronRight data-testid="bread-icon" className={`text-xl ${textColor}`} />
              </Fragment>
            );
          } else {
            return (
              <Link key={index} href={crumb.link}>
                <span className="text-primary-green font-[600] cursor-pointer">{crumb.name}</span>
              </Link>
            );
          }
        })}
      </ol>
    </div>
  );
};
