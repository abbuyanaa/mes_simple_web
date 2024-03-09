// import { axiosAPI } from '../api';
import { EYE_SLASH_SOLID_SVG, EYE_SOLID_SVG } from './consts';

export const checkAuth = (user, menuItem) => user?.qadmin || (
  !menuItem?.admin && (
    (menuItem?.login === null || menuItem?.login === undefined) || (
      menuItem.login ? user?.auth_grade >= (menuItem.grade || -1) : !user
    )
  )
);

// export const fetcher = (url, params) => axiosAPI.get(url, { params })
//   .then((result) => result.data); // req.query
// export const postFetcher = (url, data) => axiosAPI.post(url, data)
//   .then((result) => result.data); // req.body
// export const deleteFetcher = (url) => axiosAPI.delete(url)
//   .then((result) => result.data); // req.query

export const thousandCommaText = (num) => num.toString().replace(/(?<!\.\d*)\B(?=(\d{3})+(?!\d))/g, ',');

export const getQueryString = (obj) => `?${Object.keys(obj).map((v) => `${v}=${obj[v]}`).join('&')}`;

export const deepCopy = (data, def = null) => (data ? JSON.parse(JSON.stringify(data)) : def);

export const getBufferUrl = (bufferData, mimeType) => {
  if (typeof window !== 'undefined') {
    return URL.createObjectURL(
      new Blob([Uint8Array.from(bufferData).buffer], { type: mimeType }),
    );
  }
  return null;
};

export const formatBytes = (bytes, decimals) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals || 0;
  const sizes = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / (k ** i)).toFixed(dm))} ${sizes[i]}`;
};

export const getExtIcon = (ext) => {
  let icon = 'file';
  try {
    switch (ext.toUpperCase()) {
    case 'BMP':
    case 'JPEG':
    case 'JPG':
    case 'GIF':
    case 'PNG':
    case 'TIFF':
    case 'RAW':
    case 'PSD':
      icon = 'image';
      break;
    case 'DOC':
      icon = 'docfile';
      break;
    case 'DOCX':
      icon = 'docxfile';
      break;
    case 'PDF':
      icon = 'pdffile';
      break;
    case 'PPT':
      icon = 'pptfile';
      break;
    case 'PPTX':
      icon = 'pptxfile';
      break;
    case 'RTF':
      icon = 'rtffile';
      break;
    case 'TXT':
      icon = 'txtfile';
      break;
    case 'XLS':
      icon = 'xlsfile';
      break;
    case 'XLSX':
      icon = 'xlsxfile';
      break;
    default:
      break;
    }
  } catch (error) {
    console.error(error);
  }
  return icon;
};

export const getPasswordIcon = (op) => (op === 'password' ? EYE_SLASH_SOLID_SVG : EYE_SOLID_SVG);

export const toggleFullScreen = () => {
  if (!document.fullscreenElement // alternative standard method
    && !document.currentFullScreenElement
    && !document.mozFullScreenElement /* Mozilla */
    && !document.webkitFullscreenElement /* Safari */
    && !document.msFullscreenElement /* IE11 */
  ) { // current working methods
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) { /* Mozilla */
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) { /* Safari */
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    } else if (document.documentElement.msRequestFullscreen) { /* IE11 */
      document.documentElement.msRequestFullscreen();
    }
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.cancelFullScreen) {
    document.cancelFullScreen();
  } else if (document.mozCancelFullScreen) { /* Mozilla */
    document.mozCancelFullScreen();
  } else if (document.webkitCancelFullScreen) { /* Safari */
    document.webkitCancelFullScreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
};
