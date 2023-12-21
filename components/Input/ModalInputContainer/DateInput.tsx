import { useState } from 'react';
import { COLORS } from '@/styles/palettes';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Dayjs } from 'dayjs';
import { DEFAULT_PLACEHOLDER } from '@/constants/Input';
import { StyledInputContainer, StyledLabel } from '../Input.style';

interface Props {
  label?: string;
  placeholder?: string;
  getValue?: (value: Dayjs | null | undefined) => void;
}

/**
 * @param label input 라벨 텍스트
 * @param placeholder input placeholder 텍스트
 * @param getValue 현재 컴포넌트에서 부모 컴포넌트로 선택된 값 넘겨 보낼 부모 컴포넌트의 함수
 * */
function DateInput({ label = '마감일', placeholder = DEFAULT_PLACEHOLDER.DATE, getValue }: Props) {
  const [dates, setDates] = useState<Dayjs | null>();

  // getValue(dates); --> 부모 컴포넌트에서 getValue 넘겨줘서 선택 값 넘겨받으면 됨!

  return (
    <StyledInputContainer>
      <StyledLabel>{label}</StyledLabel>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          sx={{
            '.MuiInputBase-root': {
              outline: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              color: `${COLORS.BLACK_33}`,
              fontWeight: 400,
              borderColor: `${COLORS.BLUE_DB}`,
              height: '52px',
              border: `1px solid ${COLORS.GRAY_D9}`,
              ':hover': {
                borderColor: `${COLORS.VIOLET_55}`,
              },
              ':focus-within': {
                borderColor: `${COLORS.VIOLET_55}`,
              },
            },
            '.MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
            width: 1,

            border: 'none',
          }}
          value={dates}
          disablePast
          closeOnSelect
          format="YYYY.MM.DD hh:mm A"
          onChange={(newValue: Dayjs | null) => setDates(newValue)}
          slotProps={{ textField: { placeholder: placeholder } }}
        />
      </LocalizationProvider>
    </StyledInputContainer>
  );
}

export default DateInput;
