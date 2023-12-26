import { COLORS } from '@/styles/palettes';

export const NO_VALUE_ERROR = '값을 입력해 주세요.';

export const EMAIL_ERROR = {
  FORMAT_ERROR: '이메일 형식으로 작성해 주세요.',
};

export const PWD_ERROR = {
  FORMAT_ERROR: '비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요.',
};

export const PWD_CHECK_ERROR = {
  PWD_NOT_SAME: '비밀번호가 일치하지 않아요.',
};

export const DEFAULT_PLACEHOLDER = {
  EMAIL: '이메일을 입력해 주세요',
  PWD: '8자 이상 입력해 주세요',
  PWD_CHECK: '비밀번호를 한번 더 입력해 주세요',
  NOW_PWD: '현재 비밀번호 입력',
  NEW_PWD: '새 비밀번호 입력',
  NEW_PWD_CHECK: '새 비밀번호 확인 입력',
  COMMENT: '댓글 작성하기',
  DATE: '날짜를 입력해 주세요',
  TAG: '입력 후 Enter',
  NICKNAME: '닉네임을 입력해 주세요',
};

// <-- Modal Input -->
export const TAG_COLOR = [
  [COLORS.ORANGE_F9, COLORS.ORANGE_D5],
  [COLORS.GREEN_E7, COLORS.GREEN_86],
  [COLORS.PINK_F7, COLORS.PINK_D5],
  [COLORS.BLUE_DB, COLORS.BLUE_49],
];
export const TAG_DATA = [].map((item) => ({
  value: item,
  label: item,
}));
