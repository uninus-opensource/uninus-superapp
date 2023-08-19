"use client";
import { FC, ReactElement, useState } from "react";
import { AccordionType } from "./type";
import { CaretUpFilled } from "@ant-design/icons";

export const Accordion: FC<AccordionType> = ({
  children,
  newIcon,
  title,
  titleClassName,
  className,
  showIcon = true,
}): ReactElement => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      data-testid="accordion"
      className="rounded-lg w-full shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] py-3"
    >
      <div
        className="flex justify-between items-center cursor-pointer select-none px-5"
        onClick={toggleAccordion}
      >
        <h2 className={titleClassName}>{title}</h2>
        {showIcon ? (
          <CaretUpFilled
            className={`text-secondary-green-4 text-[1.7rem] duration-300 ${
              isOpen ? "rotate-0" : "rotate-180"
            }`}
          />
        ) : (
          <span className="text-sm">{newIcon}</span>
        )}
      </div>
      {isOpen && <div className={className}>{children}</div>}
    </div>
  );
};
