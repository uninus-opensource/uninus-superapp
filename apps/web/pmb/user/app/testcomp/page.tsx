"use client";
import { FC, ReactElement, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import {
  Button,
  CheckBox,
  UploadField,
  DraggableComponent,
  TabJalurSeleksi,
  SelectField,
  Accordion,
  SelectOption,
} from "@uninus/web/components";
import { PlusOutlined } from "@ant-design/icons";

const MultiOptions = [
  {
    value: "1",
    label: "CSS",
  },
  {
    value: "2",
    label: "JS",
  },
  {
    value: "3",
    label: "Typescript",
  },
  {
    value: "3",
    label: "Tailwind",
  },
];

const LandingPage: FC = (): ReactElement => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<FieldValues>({
    defaultValues: {
      checkboxField: false,
      uploadField: "",
      draggableComponent: "",
      favoriteProgrammingLang: undefined,
    },
  });

  const [showModal, setShowModal] = useState<boolean>(false);

  const handleOpenModal = () => {
    setShowModal(!showModal);
  };
  // const handleCloseModal = () => {
  //   setShowModal(false);
  // };

  const onSubmit = handleSubmit((data) => {
    console.log("tersubmit");
  });

  return (
    <section className="px-6 py-12 my-36">
      <div className="flex flex-col justify-center items-center h-screen gap-4">
        <CheckBox
          control={control}
          name={"checkboxField"}
          required
          variant="primary"
          size="sm"
          labelSize="sm"
          label="Setuju"
          message="Valid"
        />
        <CheckBox
          control={control}
          name={"checkboxField"}
          required
          variant="error"
          size="md"
          labelSize="md"
          label="Setuju"
          message="Valid"
        />
        <CheckBox
          control={control}
          name={"checkboxField"}
          required
          variant="warning"
          size="lg"
          labelSize="lg"
          label="Setuju"
          message="Valid"
        />
        <div className="flex gap-4">
          <Button variant="elevated" size="sm">
            Elevated
          </Button>
          <Button variant="elevated" size="sm" disabled>
            Elevated
          </Button>
          <Button variant="filled" size="sm">
            Filled
          </Button>
          <Button variant="filled" size="sm" disabled>
            Filled
          </Button>
          <Button variant="filled-tonal" size="sm">
            Filled Tonal
          </Button>
          <Button variant="filled-tonal" size="sm" disabled>
            Filled Tonal
          </Button>
          <Button variant="outlined" size="sm">
            Outlined
          </Button>
          <Button variant="text-icon" size="sm">
            Text/Icon Only
          </Button>
          <Button variant="text-icon" size="sm" disabled>
            Text/Icon Only
          </Button>
          <Button variant="float-bottom-right" size="sm" width="w-10" height="h-10">
            <PlusOutlined />
          </Button>
        </div>
        <Button onClick={handleOpenModal} variant="filled" size="sm" width="w-28" height="h-8">
          Modal
        </Button>

        <DraggableComponent control={control} name="draggableComponent" />
        <TabJalurSeleksi />
        <div className="w-1/2">
          <SelectOption
            labels="Pilih Keahlian lebih dari 1:"
            labelClassName="font-bold"
            options={MultiOptions}
            isSearchable={true}
            name="SelectController"
            control={control}
            isMulti={true}
          />
        </div>
        <div className="w-1/2">
          <SelectOption
            labels="Pilih Keahlian :"
            labelClassName="font-bold"
            options={MultiOptions}
            isSearchable={true}
            name="SelectController2"
            control={control}
            isMulti={false}
          />
        </div>
        <div className="flex gap-2 w-auto">
          <UploadField
            className="flex flex-col gap-4"
            control={control}
            name="file"
            defaultImage=""
            variant="default"
            previewImage="w-[500px] "
          />
          <UploadField
            className="flex flex-col gap-4"
            control={control}
            name="file"
            defaultImage=""
            previewImage="w-[500px] "
            variant="custom"
          />
        </div>
        <form onSubmit={onSubmit} className="w-1/2 flex flex-col justify-center items-center gap-3">
          <SelectOption
            labels="favorit bahasa pemrograman :"
            labelClassName="font-bold"
            options={[
              {
                value: "JAVASCRIPT",
                label: "JAVASCRIPT",
              },
              {
                value: "PHP",
                label: "PHP",
              },
              {
                value: "RUBY",
                label: "RUBY",
              },
              {
                value: "PYTHON",
                label: "PYTHON",
              },
              {
                value: "KOTLIN",
                label: "KOTLIN",
              },
              {
                value: "JAVA",
                label: "JAVA",
              },
              {
                value: "GO",
                label: "GO",
              },
              {
                value: "DART",
                label: "DART",
              },
              {
                value: "SCALA",
                label: "SCALA",
              },
              {
                value: "HASKELL",
                label: "HASKELL",
              },
              {
                value: "HTML",
                label: "HTML 😡",
              },
            ]}
            isSearchable={true}
            name="favoriteProgrammingLang"
            control={control}
            isMulti={false}
            required={true}
          />
          <Button
            variant="elevated"
            size="sm"
            disabled={!isValid}
            className={`${
              isValid ? "bg-primary-green" : "bg-slate-2 cursor-not-allowed"
            } text-white rounded-md`}
          >
            Submit
          </Button>
        </form>
        <SelectField
          name="nama"
          label="Nama"
          size="md"
          options={[
            {
              label: "Rian",
              value: "Rian",
            },
            {
              label: "Dejan",
              value: "Dejan",
            },
          ]}
          placeholder="Pilih Nama"
          control={control}
          width="w-36"
        />
        <Accordion title="Data diri pendaftar">TES</Accordion>
      </div>
    </section>
  );
};

export default LandingPage;
