import { FC, ReactElement } from 'react';
import { TCardProps } from './type';

export const Card: FC<TCardProps> = ({
  cardTitle,
  icon,
  iconText,
  children,
}): ReactElement => {
  return (
    <section className="flex flex-col gap-4 w-72 justify-between p-8 h-72 rounded-xl shadow-md shadow-grayscale-2 relative">
      <figure
        className={`w-14 h-14 p-2 flex justify-center items-center bg-secondary-green-4 text-primary-white rounded-md 
      ${iconText ? 'text-3xl font-bebasNeue' : 'text-5xl'}`}
      >
        {iconText ? iconText : icon}
      </figure>
      <h1 className="text-2xl font-bebasNeue font-extramedium text-secondary-green-4 uppercase">
        {cardTitle}
      </h1>
      <p className="text-xs">{children}</p>
    </section>
  );
};
