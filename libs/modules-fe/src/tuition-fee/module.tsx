'use client';
import { ReactElement, FC, Suspense } from 'react';
import { SearchInput } from '@uninus/components';
import DataTable, { TableColumn } from 'react-data-table-component';
import { tableMagister, tableSarjana } from './types';
import {
  useSarjanaData,
  useMagisterData,
  useSarjanaQuery,
  useMagisterQuery,
} from './hooks';
import { useRecoilValueLoadable } from 'recoil';

export const TuitionFeeModule: FC = (): ReactElement => {
  const { getSarjanaData } = useSarjanaData();
  const { getMagisterData } = useMagisterData();
  const { setSarjanaQuery, getSarjanaQuery } = useSarjanaQuery();
  const { setMagisterQuery, getMagisterQuery } = useMagisterQuery();
  const recoilValue = useRecoilValueLoadable(myAtom);

  const columns: TableColumn<tableSarjana>[] = [
    {
      name: 'No',
      width: '6%',
      cell: (row, rowIndex) => <div className="px-2">{rowIndex + 1}</div>,
    },
    { name: 'Fakultas', selector: (row) => row.fakultas, sortable: true },
    {
      name: 'Program Studi',
      selector: (row) => row.program_studi,
      sortable: true,
    },
    { name: 'UKT/Semester', selector: (row) => row.ukt, sortable: true },
  ];

  const columnsMagister: TableColumn<tableMagister>[] = [
    {
      name: 'No',
      width: '6%',
      cell: (row, rowIndex) => <div className="px-2">{rowIndex + 1}</div>,
    },

    {
      name: 'Program Studi',
      selector: (row) => row.program_studi,
      width: '60%',
      sortable: true,
    },
    { name: 'UKT/Semester', selector: (row) => row.ukt, sortable: true },
  ];

  const customStyles = {
    rows: {
      style: {
        minHeight: '45px',
        fontSize: '16px',
      },
    },

    headCells: {
      style: {
        backgroundColor: '#F0F8FF',
        textColor: '#A3A3A3',
        fontSize: '16px',
      },
    },
  };

  const paginationComponentOptions = {
    rowsPerPageText: 'Data per halaman',
    rangeSeparatorText: 'dari',
  };

  return (
    <section className="px-6 py-12">
      <div className="flex flex-col  w-full h-full pt-20 gap-2 items-center px-20">
        <h1 className="text-2xl py-4">
          Satuan Dana Pendidikan Program Sarjana
        </h1>
        <div>
          <SearchInput
            value={getSarjanaQuery}
            onChange={(e: { target: { value: string } }) =>
              setSarjanaQuery(e.target.value)
            }
          />
        </div>
        <Suspense fallback="loadiiing...">
          <DataTable
            columns={columns}
            data={getSarjanaData}
            customStyles={customStyles}
            pagination
            paginationComponentOptions={paginationComponentOptions}
          />
        </Suspense>
      </div>
      <div className="flex flex-col  w-full h-full  gap-2 items-center px-20">
        <h1 className="text-2xl py-4">
          Satuan Dana Pendidikan Program Magister dan Doctor
        </h1>
        <div>
          <SearchInput
            value={getMagisterQuery}
            onChange={(e: { target: { value: string } }) =>
              setMagisterQuery(e.target.value)
            }
          />
        </div>
        <Suspense fallback="loadiiing...">
          <DataTable
            columns={columnsMagister}
            data={getMagisterData}
            customStyles={customStyles}
            pagination
            paginationComponentOptions={paginationComponentOptions}
          />
        </Suspense>
      </div>
    </section>
  );
};
