import { useState } from 'react';
import { COLORS } from '@/styles/palettes';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Dayjs } from 'dayjs';
import { DEFAULT_PLACEHOLDER } from '@/constants/ModalInput';
import { StyledInputContainer, StyledLabel } from '../Input.style';

interface Props {
  label?: string;
  placeholder?: string;
  onChange: (inputLabel: string, value: string) => void;
}

/**
 * Modal Date Input
 * @param label input 라벨 텍스트
 * @param placeholder input placeholder 텍스트
 * */
function DateInput({ label = '마감일', placeholder = DEFAULT_PLACEHOLDER.DATE, onChange }: Props) {
  const [dates, setDates] = useState<Dayjs | null>();

  const handleDateChange = (newVal: Dayjs | null) => {
    setDates(newVal);
    if (newVal === (undefined || null)) return;
    const dateToStr =
      newVal.year() + '.' + (newVal.month() + 1) + '.' + newVal?.date() + ' ' + newVal?.hour() + ':' + newVal?.minute(); //ex: 2024.9.18 5:55
    onChange(label, dateToStr);
  };

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
          onChange={(newValue: Dayjs | null) => handleDateChange(newValue)}
          slotProps={{ textField: { placeholder: placeholder } }}
        />
      </LocalizationProvider>
    </StyledInputContainer>
  );
}

export default DateInput;
