"use client";
import { ReactElement, useCallback, useState } from 'react';
import { useDropzone, FileWithPath } from 'react-dropzone';
import Image from 'next/image';
import { FieldValues, useController } from 'react-hook-form';
import { FcDocument } from 'react-icons/fc';
import { TUploadFieldProps } from './types';

export const DraggableComponent = <T extends FieldValues>(
  props: TUploadFieldProps<T>
): ReactElement => {
  const { field } = useController(props);
  const [fileType, setFileType] = useState('');
  const [fileName, setFileName] = useState('');
  const handleRemoveFile = () => {
    field.onChange(null);
    setFileType('');
    setFileName('');
  };

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      if (acceptedFiles[0]) {
        field.onChange(acceptedFiles[0]);
        setFileType(acceptedFiles[0].type || '');
        setFileName(acceptedFiles[0].name || '');
      }
    },
    [field]
  );

  const { getRootProps, getInputProps } = useDropzone({
    ...props,
    onDrop,
  });

  const ACCEPTED_IMAGE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/webp',
    'image/png',
  ];

  const ACCEPTED_VIDEO_TYPES = ['video/ogg', 'video/webm', 'video/mp4'];
  const ACCEPTED_DOCUMENT_TYPES = ['application/pdf', 'application/msword'];

  return (
    <div
      {...getRootProps()}
      className={`flex items-center h-auto bg-neutral-100 justify-center relative w-auto p-2 border-2 border-dashed rounded-lg border-neutral-300 hover:text-white ${props.className}`}
    >
      {field.value && ACCEPTED_IMAGE_TYPES.includes(fileType) ? (
        <Image
          src={URL.createObjectURL(field.value)}
          width={400}
          height={400}
          alt={'drag'}
        />
      ) : field.value && ACCEPTED_VIDEO_TYPES.includes(fileType) ? (
        <video
          width={400}
          controls
          height={400}
          src={URL.createObjectURL(field.value)}
        />
      ) : field.value && ACCEPTED_DOCUMENT_TYPES.includes(fileType) ? (
        <span className="flex flex-col text-black">
          <FcDocument />
          {fileName}
        </span>
      ) : (
        <label className="flex flex-col items-center w-full px-4 py-6 bg-[#F5F5F5] dark:bg-transparent rounded-lg cursor-pointer hover:text-white">
          <span className="mt-2 text-[14px] text-black dark:text-white">
            Upload files
          </span>
          <span className="mt-2 text-[12px] text-[#737373] dark:text-white">
            Drag & drop some files here
          </span>
          <input
            {...getInputProps()}
            onChange={(event) => {
              field.onChange(event.target.files);
            }}
            className="hidden"
            type="file"
          />
        </label>
      )}
      {field.value && (
        <span
          onClick={handleRemoveFile}
          className="text-red-600 cursor-pointer shadow-sm bg-neutral-100 p-4 w-full h-[30px] items-center flex justify-center absolute bottom-0"
        >
          Change File
        </span>
      )}
    </div>
  );
};
