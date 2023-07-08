import { FC, ReactElement, useState } from 'react';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';
import { FormData, TUploadFile } from './types';

export const UploadField: FC<TUploadFile> = ({
  variant,
  className,
  required,
}): ReactElement => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const labelVariant = clsx('text-gray-500 font-medium ', {
    'text-lg ': variant === 'lg',
    'text-md ': variant === 'md',
    'text-sm ': variant === 'sm',
  });

  const [fileUrl, setFileUrl] = useState('');
  const [uploaded, setUploaded] = useState(false);
  const [fileName, setFileName] = useState('');
  const onSubmit = handleSubmit((data) => {
    const file = data.file[0];
    const fileReader = new FileReader();

    fileReader.onload = () => {
      setFileUrl(fileReader.result as string);
      setUploaded(true); // Set uploaded to true

      // Set file name if file is a document
      if (file.type.includes('application/')) {
        setFileName(file.name);
      }
    };

    fileReader.readAsDataURL(file);
  });

  const handleCancel = () => {
    setFileUrl('');
    setUploaded(false);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        className={`file:rounded-lg file:border-0 file:text-center file:font-semibold file:bg-green-100 file:text-green-700 hover:file:bg-green-200 border rounded-md text-gray-500 ${labelVariant} my-4 ${className}`}
        type="file"
        {...register('file', { required })}
      />
      {errors.file && <span>This field is required</span>}
      {uploaded && (
        <button
          type="button"
          className="bg-red-400 text-white font-bold rounded-md p-1 px-2 mx-2 text-sm"
          onClick={handleCancel}
        >
          Cancel
        </button>
      )}
      <button
        type="submit"
        className="bg-green-400 text-white font-bold rounded-md p-1 px-2 mx-2 text-sm"
      >
        Submit
      </button>
      {fileUrl && (
        <span>
          {fileUrl.includes('data:application/') ? (
            <span>{fileName}</span>
          ) : (
            <img src={fileUrl} alt="Uploaded file" />
          )}
        </span>
      )}
    </form>
  );
};
