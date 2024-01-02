import api from '@/apis/api';
import API from '@/apis/api';
import AddImageButton from '@/components/AddImageButton/AddImageButton';
import BasicInput from '@/components/Input/ModalInputContainer/BasicInput';
import DateInput from '@/components/Input/ModalInputContainer/DateInput';
import TagInput, { Tag, TagProps } from '@/components/Input/ModalInputContainer/TagInput';
import ModalDropDown from '@/components/ModalDropDown/ModalDropDown';
import TwinButton from '@/components/common/Button/TwinButton';
import { INIT_CREATE_TODO } from '@/constants/InitialModalValues';
import useGetMember from '@/hooks/DropDown/useGetMember';
import useManager from '@/hooks/DropDown/useManager';
import { onMobile } from '@/styles/mediaQuery';
import { ModalCommonProps } from '@/types/modal';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

interface Props extends ModalCommonProps {
  dashboardInfos: { columnId: number; dashboardId: number };
}

function CreateToDo({ dashboardInfos, onCancelClick = () => {}, onOkClick, getValue = () => {} }: Props) {
  const [image, setImage] = useState<File>();
  const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>(null);
  const [values, setValues] = useState(INIT_CREATE_TODO);

  const { manager } = useManager();
  const { setMembers } = useGetMember();

  const handleChange = (inputLabel: string, inputValue: string | {} | TagProps[] | ArrayBuffer | null) => {
    setValues({
      ...values,
      [inputLabel]: inputValue,
    });
  };
  getValue(values);

  const handleSetMembers = async () => {
    const getMember = await API.members.getMembersInDashboard({ dashboardId: dashboardInfos.dashboardId });
    setMembers(getMember);
  };

  const changeProfile = async () => {
    if (image) {
      const formData = new FormData();
      formData.append('image', image);

      const response = await axios
        .post(`https://sp-taskify-api.vercel.app/1-4/columns/${dashboardInfos.columnId}/card-image`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            withCredentials: true,
          },
        })
        .then();
      const { imageUrl } = response.data;
      return imageUrl;
    }
  };

  const handleCreateToDoSubmit = async () => {
    const formatedTagData: string[] = values.태그.map((tagEl: Tag) =>
      [tagEl.value, tagEl.color, tagEl.backgroundColor].join('/'),
    );

    const CardContentImgUrl = await changeProfile().then();

    const body = {
      assigneeUserId: manager ?? null,
      dashboardId: dashboardInfos.dashboardId, // 필수 입력 요소
      columnId: dashboardInfos.columnId, // 필수 입력 요소
      title: values.제목, // 필수 입력 요소
      description: values.설명, // 필수 입력 요소
      dueDate: values.마감일 ?? null,
      tags: formatedTagData ?? null,
      imageUrl: CardContentImgUrl ?? null,
    };

    try {
      const response = await api.cards.createCard(body);
      // api post request succeed
      if (response) onOkClick(); // Column의 onOkClick 함수 실행
    } catch (e) {
      // api post request failed
      console.log('error!', e);
    }
  };

  useEffect(() => {
    handleSetMembers();
  }, []);

  return (
    <>
      <StyledContainer>
        <StyledModalContainer>
          <ModalDropDown type="manager" onChange={handleChange} />
        </StyledModalContainer>
        <BasicInput isNecessary label="제목" onChange={handleChange} inputValue={values.제목}></BasicInput>
        <BasicInput isNecessary isTextArea label="설명" onChange={handleChange} inputValue={values.설명}></BasicInput>
        <DateInput onChange={handleChange} />
        <TagInput onChange={handleChange} />
        <AddImageButton
          type="modal"
          image={null}
          setImage={setImage}
          previewImage={previewImage}
          setPreviewImage={setPreviewImage}
        />
      </StyledContainer>

      <StyledButtonContainer>
        <StyledTwinButton
          text1="취소"
          text2="생성"
          size="large"
          onLeftClick={onCancelClick}
          onRightClick={handleCreateToDoSubmit}
        ></StyledTwinButton>
      </StyledButtonContainer>
    </>
  );
}

export default CreateToDo;

const StyledContainer = styled.div`
  white-space: nowrap;
  display: flex;
  flex-direction: column;
  gap: 27px;
  ${onMobile} {
    gap: 22px;
  }
`;

export const StyledButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 24px;

  ${onMobile} {
    justify-content: center;
  }
`;

const StyledModalContainer = styled.div`
  display: flex;
  justify-content: space-between;

  ${onMobile} {
    flex-direction: column;
    gap: 22px;
  }
`;

export const StyledTwinButton = styled(TwinButton)`
  & > button {
    border-radius: 8px;
  }
`;
