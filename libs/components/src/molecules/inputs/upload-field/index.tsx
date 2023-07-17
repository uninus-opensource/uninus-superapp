import { ReactElement, useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { TUploadFieldProps } from './types';

export const UploadField = <T extends FieldValues>(
  props: TUploadFieldProps<T>
): ReactElement => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState('');
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      if (file.type.includes('image')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setPreviewImage('');
      }
    }
  };
  return (
    <section className="flex w-auto my-1 gap-y-2 ">
      {previewImage && (
        <div>
          <img src={previewImage} alt="Preview" style={{ maxWidth: '180px' }} />
        </div>
      )}
      <input type="file" accept="image/*,.pdf" onChange={handleFileChange} />
    </section>
  );
};
