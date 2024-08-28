export enum HEADER_KEY_TYPE {
  PC = 'PC',
  MOBILE = 'MOBILE',
  BOTH = 'BOTH',
}

export const HEADER_KEY = [
  {
    label: 'common.user',
    link: '/',
    type: HEADER_KEY_TYPE.BOTH,
    isShow: true,
  },
  {
    label: 'common.list_image',
    link: '/list-image',
    type: HEADER_KEY_TYPE.BOTH,
    isShow: true,
  },
];

export enum DATE_FORMAT {
  DMY_SLASH = 'DD/MM/YYYY',
  YMD_SLASH = 'YYYY/MM/DD',
}

export const SM_MIN_WIDTH = 1200; // by px

export enum ScreenType {
  Galaxy = 'galaxy',
  Mobile = 'mobile',
  Tablet = 'tablet',
  IPadPro = 'ipad pro',
  PC = 'pc',
}

export const ScreenBreakPoint = {
  [ScreenType.Galaxy]: 320,
  [ScreenType.Mobile]: 390,
  [ScreenType.Tablet]: 600,
  [ScreenType.IPadPro]: 834,
  [ScreenType.PC]: 1024,
};

export const CenterPadding = {
  [ScreenType.Galaxy]: '7%',
  [ScreenType.Mobile]: '11%',
  [ScreenType.Tablet]: '15%',
  [ScreenType.IPadPro]: '25%',
  [ScreenType.PC]: '27%',
};

export const ScreenModalCustom = 1280;
export const URLDetail = '/user/[id]';

export const UrlLogin = '/auth/login';
export const typeFileZip = 'application/zip';

export enum StatusUpload {
  uploading = 'uploading',
  done = 'done',
  error = 'error',
}

export const excels = ['xls', 'xlsx'];

export enum TokenKey {
  Profile = 'profile',
}
export const pageSizeDefault = 25;
export const pageOptions = [10, 25, 50];
export const ascend = 'ascend';
export const descend = 'descend';
export const sortFieldDefault = 'id';
export const selectedDefault = 'all';
export const maxYearFilter = 1;
export const maxFileSize = 25;
export const maxImageSize = 5;
export const errorMessageSystem = 'Failed to fetch';

export const HTTP_CODE = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NETWORK: 403,
  NO_CONTENT: 204,
};

export const urlImage = `${process.env.NEXT_PUBLIC_API_URL}/images`;
