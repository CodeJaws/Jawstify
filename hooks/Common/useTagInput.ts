import { Tag, TagProps } from '@/components/Input/ModalInputContainer/TagInput';
import { TAG_COLOR } from '@/constants/ModalInput';
import { ChangeEvent, KeyboardEvent, MouseEvent, useEffect, useState } from 'react';

function useTagInput({ label = '태그', defaultValue: defaultTagStringList, onChange }: TagProps) {
  const [tags, setTags] = useState<Tag[]>([]);
  const [value, setValue] = useState<string>('');

  const getFormattedTagEl = () => {
    if (!defaultTagStringList) return;
    const splitTag = defaultTagStringList.map((val) => val.split('/'));
    const formattedTag = splitTag.map((val) => ({
      value: val[0],
      color: val[1],
      backgroundColor: val[2],
    }));
    return formattedTag;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleDeleteClick = (selectedValue: string) => {
    setTags((prev) => prev.filter((prevTags) => prevTags.value !== selectedValue));
  };

  const handleOnEnterKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter' || value === '') return;

    const ranVal = Math.floor(Math.random() * 4);
    const TagColors = TAG_COLOR[ranVal];
    const newTagEl = { value: value, backgroundColor: TagColors[0], color: TagColors[1] };

    setTags((prev) => {
      if (prev.find((prevTags) => prevTags.value === newTagEl.value)) return prev;
      return [...prev, newTagEl];
    });

    setValue('');
  };

  useEffect(() => {
    onChange(label, tags);
  }, [tags]);

  useEffect(() => {
    if (defaultTagStringList) {
      const formatTags = getFormattedTagEl() as Tag[];
      setTags(formatTags);
    }
  }, []);

  return { tags, value, handleDeleteClick, handleInputChange, handleOnEnterKeyUp };
}

export default useTagInput;
