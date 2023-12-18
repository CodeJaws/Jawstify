export const selectSize = (size: string) => {
  switch (size) {
    case 'large':
      return 12;
    case 'small':
      return 10;
    default:
      return 12;
  }
};
