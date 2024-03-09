import { confirm, custom } from 'devextreme/ui/dialog';

export const customAlert = (title, content, buttonText, returnValue) => custom({
  title,
  messageHtml: `<strong>${content.split('\r\n').join('<br />')}</strong>`,
  buttons: [{
    text: buttonText,
    type: 'default',
    onClick: () => returnValue || true,
  }],
}).show();

export const customConfirm = (title, content) => confirm(
  `<strong">${content.split('\r\n').join('<br />')}</strong>`,
  title,
);
