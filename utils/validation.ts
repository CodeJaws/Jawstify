// 이메일 형식 검사 (정규식)
export const isEmailFormatValid = (str: string) =>
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i.test(str)

// 비밀번호 형식 검사 (정규식)
export const isPwdFormatValid = (str: string) => /[a-zA-Z]/g.test(str) && /\d/g.test(str) && str.length > 8
