import StatusChip from '@/components/Chip/StatusChip';
import ModalCard from '@/components/ModalCard/ModalCard';
import { BACK_END, MAX_LEVEL, NORMAL, PROJECT, TO_DO } from '@/constants/Chip';
import CROWN from '@/public/assets/icons/crown.svg';
import Green from '@/public/assets/icons/GreenEllipse.svg';
import { COLORS } from '@/styles/palettes';
import React, { createContext } from 'react';

interface Tag {
  id: number;
  text: string;
  color: string;
  backgroundColor: string;
}

interface Props {
  title: string;
  content: string;
  status: React.ReactElement;
  tag: Tag[];
  cardImg: string;
  userProfileImg: string;
  userName: string;
  createdAt: string;
  comment: string;
  manger: string;
  mangerImg: string;
  deadLine: string;
}

export const ModalContext = createContext<Props>({
  title: '',
  content: '',
  status: <StatusChip content={TO_DO} />,
  tag: [],
  cardImg: '',
  userProfileImg: '',
  userName: '',
  createdAt: '',
  comment: '',
  manger: '',
  mangerImg: '',
  deadLine: '',
});

const title = '🚨 비상';
const content =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum finibus nibh arcu, quis consequat ante cursus eget. Cras mattis, nulla non laoreet porttitor, diam justo laoreet eros, vel aliquet diam elit at leo.';
const status = <StatusChip content={TO_DO} />;
const tag = [
  { id: 0, text: PROJECT, color: COLORS.WHITE_FF, backgroundColor: COLORS.BLUE_49 },
  { id: 1, text: NORMAL, color: COLORS.WHITE_FF, backgroundColor: COLORS.GREEN_7A },
  { id: 2, text: BACK_END, color: COLORS.WHITE_FF, backgroundColor: COLORS.PINK_E8 },
  { id: 3, text: MAX_LEVEL, color: COLORS.WHITE_FF, backgroundColor: COLORS.ORANGE_F9 },
];
const cardImg = CROWN;
const userProfileImg = Green;
const userName = '정만철';
const createdAt = '2023.12.22 14:00';
const comment = '댓글 내용입니다.';
const manger = '고양이';
const mangerImg = Green;
const deadLine = '2023.12.31 14:00';

function ModalCardTest() {
  return (
    <ModalContext.Provider
      value={{
        title,
        content,
        status,
        tag,
        cardImg,
        userProfileImg,
        userName,
        createdAt,
        comment,
        manger,
        mangerImg,
        deadLine,
      }}
    >
      <ModalCard />
    </ModalContext.Provider>
  );
}

export default ModalCardTest;
