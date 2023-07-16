import { FC, ReactElement, useState } from 'react';
import { AccordionType } from './type';
import { CaretDownFilled, CaretUpFilled } from '@ant-design/icons';

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
    <div className="rounded-lg w-[80vw] md:w-[70vw] lg:w-[70vw] xl:w-[70vw] 2xl-[70vw] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] py-5">
      <div
        className="flex justify-between items-center cursor-pointer select-none px-10"
        onClick={toggleAccordion}
      >
        <h2 className="text-[2rem] font-extrabold text-secondary-green-4">
          {title}
        </h2>

        <CaretUpFilled
          className={`text-secondary-green-4 text-[2.5rem] duration-300 ${
            isOpen ? 'rotate-0' : 'rotate-180'
          }`}
        />
      </div>
      {isOpen && <div className={className}>{children}</div>}
    </div>
  );
};
