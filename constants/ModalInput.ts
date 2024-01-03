import { COLORS } from '@/styles/palettes';

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

export const DefaultImg =
  'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/taskify/profile_image/1-4_319_1704279374904.png';

export const DefaultCardImg =
  'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/taskify/task_image/1-4_1025_1704280139216.png';
