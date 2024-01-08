export const EMAIL_VALIDATE_PATTERN =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

export const PWD_VALIDATE_PATTERN = /[a-zA-Z]/g && /\d/g;

export const NO_VALUE_ERROR = '값을 입력해 주세요.';

export const EMAIL_ERROR = {
  FORMAT_ERROR: '이메일 형식으로 작성해 주세요.',
};

export const PWD_ERROR = {
  MIN_LENGTH_ERROR: '8자 이상 입력해 주세요.',
  FORMAT_ERROR: '비밀번호는 영문과 숫자를 조합하여 입력해야합니다.',
};

export const PWD_CHECK_ERROR = {
  PWD_NOT_SAME: '비밀번호가 일치하지 않아요.',
};

export const DEFAULT_PLACEHOLDER = {
  EMAIL: '이메일을 입력하세요',
  PWD: '8자 이상 입력해 주세요',
  PWD_CHECK: '비밀번호를 한번 더 입력해 주세요',
  NOW_PWD: '현재 비밀번호 입력',
  NEW_PWD: '새 비밀번호 입력',
  NEW_PWD_CHECK: '새 비밀번호 확인 입력',
  COMMENT: '댓글 작성하기',
  DATE: '날짜를 입력해 주세요',
  TAG: '입력 후 Enter',
  NICKNAME: '닉네임을 입력하세요',
};

export const SIGNUP_SUCCESS_MSG = '가입이 완료되었습니다';
