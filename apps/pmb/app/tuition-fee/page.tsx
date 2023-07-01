'use client';
import { FC, ReactElement, useState } from 'react';
import { SearchInput } from '@uninus/components';
import DataTable, { TableColumn } from 'react-data-table-component';
import { dataSarjana, dataMagister } from './store';
import { tableMagister, tableSarjana } from './types';

const TuitionFee: FC = (): ReactElement => {
  const [value, setValue] = useState('');

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
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <DataTable
          columns={columns}
          data={dataSarjana}
          customStyles={customStyles}
          pagination
          paginationComponentOptions={paginationComponentOptions}
        />
      </div>
      <div className="flex flex-col  w-full h-full  gap-2 items-center px-20">
        <h1 className="text-2xl py-4">
          Satuan Dana Pendidikan Program Magister dan Doctor
        </h1>
        <div>
          <SearchInput
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <DataTable
          columns={columnsMagister}
          data={dataMagister}
          customStyles={customStyles}
          pagination
          paginationComponentOptions={paginationComponentOptions}
        />
      </div>
    </section>
  );
};

export default TuitionFee;
