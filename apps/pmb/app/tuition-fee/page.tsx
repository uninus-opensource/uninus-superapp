'use client';
import { FC, Fragment, ReactElement, useState } from 'react';
import { Navbar, Footer, SearchInput } from '@uninus/components';
import DataTable, { TableColumn } from 'react-data-table-component';

const TuitionFee: FC = (): ReactElement => {
  const [value, setValue] = useState('');
  interface Fee {
    fakultas: string;
    program_studi: string;
    ukt: string;
  }

  const data: Fee[] = [
    {
      fakultas: 'Fakultas Teknik',
      program_studi: 'Informatika',
      ukt: '6.700.000',
    },
    {
      fakultas: 'Fakultas Pendidikan',
      program_studi: 'Matematika',
      ukt: '7.200.000',
    },
    {
      fakultas: 'fakultas Perhutanan',
      program_studi: 'Sawit',
      ukt: '7.000.000',
    },
  ];

  const columns: TableColumn<Fee>[] = [
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
    <Fragment>
      <Navbar />
      <div className="flex flex-col  w-full h-screen pt-20 gap-2 items-center px-20">
        <h1 className="text-2xl py-4">
          Satuan Dana Pendidikan Program Sarjana
        </h1>
        <SearchInput value={value} onChange={(e) => setValue(e.target.value)} />
        <DataTable
          columns={columns}
          data={data}
          customStyles={customStyles}
          pagination
          paginationComponentOptions={paginationComponentOptions}
        />
      </div>
      <Footer />
    </Fragment>
  );
};

export default TuitionFee;
