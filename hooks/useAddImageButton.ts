import { ChangeEvent, Dispatch, SetStateAction, useEffect } from 'react';

interface Props {
  previewImage: string | ArrayBuffer | null;
  image: string | null | ArrayBuffer;
  setPreviewImage: Dispatch<SetStateAction<string | ArrayBuffer | null>>;
  setImage: Dispatch<SetStateAction<File | undefined>>;
}

function useAddImageButton({ previewImage, image, setPreviewImage, setImage }: Props) {
  const imgSrc = previewImage as string;
  const handleImageSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setImage(file as File);

      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    setPreviewImage(image);
  }, [image, setPreviewImage]);

  return { imgSrc, handleImageSelect };
}

export default useAddImageButton;
