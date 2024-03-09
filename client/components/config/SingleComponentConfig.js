// DateBox
export const defaultDateBoxProps = {
  type: 'date',
  width: 150,
  labelMode: 'static',
  pickerType: 'calendar',
  openOnFieldClick: true,
  acceptCustomValue: true,
  stylingMode: 'underlined',
  displayFormat: 'yyyy-MM-dd',
  dateSerializationFormat: 'yyyy-MM-dd',
  calendarOptions: { maxZoomLevel: 'month' },
};

// TextBox
export const defaultTextBoxProps = {
  width: 150,
  labelMode: 'static',
  stylingMode: 'underlined',
};

// NumberBox
export const defaultNumberBoxProps = {
  // format: ',##0',
  format: '#,##0.###',
  labelMode: 'floating',
};

// SelectBox
export const defaultSelectBoxProps = {
  width: 200,
  labelMode: 'floating',
  stylingMode: 'underlined',
};
