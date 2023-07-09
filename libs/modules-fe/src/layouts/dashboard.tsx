'use client';
import { FC, PropsWithChildren, ReactElement } from 'react';

export const DashboardLayout: FC<PropsWithChildren> = ({
  children,
}): ReactElement => {
  return (
    <html lang="en">
      <body className="flex">
        <aside>
          <div className="h-full text-white w-[300px] text-primary-white bg-primary-green p-20">
            <ul>
              <li>
                <a>Home</a>
              </li>
              <li>
                <a>Biodata</a>
              </li>
            </ul>
          </div>
        </aside>
        {/* Nunggu Sidebar */}
        <div className="w-full bg-gray-100 p-10 bg-slate-2">{children}</div>
      </body>
    </html>
  );
};
