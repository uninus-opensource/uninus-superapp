'use client';
import { FC, ReactElement, useState } from 'react';
import { AccordionType } from './type';
import { CaretUpFilled } from '@ant-design/icons';

export const Accordion: FC<AccordionType> = ({
  children,
  title,
  className,
}): ReactElement => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="rounded-lg w-full lg:w-[60vw] xl:w-[70vw] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] py-3">
      <div
        className="flex justify-between items-center cursor-pointer select-none px-10"
        onClick={toggleAccordion}
      >
        <h2 className="text-[1rem] font-extrabold text-secondary-green-4">
          {title}
        </h2>

        <CaretUpFilled
          className={`text-secondary-green-4 text-[1.7rem] duration-300 ${
            isOpen ? 'rotate-0' : 'rotate-180'
          }`}
        />
      </div>
      {isOpen && <div className={className}>{children}</div>}
    </div>
  );
};
