export const sanitizeHTML = (html = ''): string => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent ?? '';
};

export const checkEmptyData = (input: string | number) => {
  if (input == null || input === '') return '--';

  return input;
};

export const formatDate = (date: string) => {
  if (!date) return '--';

  return date.slice(0, 19).replace('T', ' ');
};

export const cleanUpInputValue = (value: string, maxLength: number) => {
  return value.trim().normalize('NFKC').slice(0, maxLength);
};

export const convertByteToMB = (size: number) => {
  return size / 1024 / 1024;
};
export interface IObject {
  [key: string]: any;
}
