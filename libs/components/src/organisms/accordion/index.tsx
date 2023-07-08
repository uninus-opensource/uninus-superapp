"use client";
import { useState, FC, ReactElement } from 'react';
import { HiChevronDown } from 'react-icons/hi';
import { AccordionItem } from './type';

export const AccordionTab: FC<AccordionItem> = ({
  header,
  titles,
  contents
}): ReactElement => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="w-full">
      <h1 className='p-2 md:text-3xl lg:text-4xl text-2xl'>{header}</h1>
      {titles.map((title, index) => (
        <div key={index}>
          <button
            type="button"
            className="w-full flex items-center gap-2 p-2 md:p-4 bg-[#1C532A] text-white hover:bg-[#FECD42] hover:text-black focus:outline-none"
            onClick={() => toggleItem(index)}
          >
            <HiChevronDown
              className={`h-6 w-6 transition-transform ${
                activeIndex === index ? 'transform rotate-180' : ''
              }`}
            />
            <h2 className="md:text-sm lg:text-lg font-medium">{title}</h2>
          </button>
          {activeIndex === index && (
            <div className="p-2 md:text-sm lg:text-base text-sm bg-gray-100">
              {contents[index].map((content, contentIndex) => (
                <div key={contentIndex}>{content}</div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

