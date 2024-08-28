import toast, { Toast } from 'react-hot-toast';
import ToastComponent from '../../ui/common/Toast';

export const options: Partial<
  Pick<
    Toast,
    | 'style'
    | 'className'
    | 'id'
    | 'icon'
    | 'duration'
    | 'ariaProps'
    | 'position'
    | 'iconTheme'
  >
> = {
  position: 'top-right',
  duration: 3000,
  className: 'custom-toast',
  style: {
    padding: 0,
  },
};

interface HandleMessageProps {
  title?: string;
  content: string;
}

/**
 * @param param0.title toast title (optional)
 * @param param0.content toast content
 */
export function showSuccessMessage({ title, content }: HandleMessageProps) {
  toast(
    (toastProp) => (
      // render custom toast
      <ToastComponent title={title} content={content} toastProp={toastProp} />
    ),
    options,
  );
}

/**
 * @param param0.title toast title (optional)
 * @param param0.content toast content
 */
export function showErrorMessage({ title, content }: HandleMessageProps) {
  toast(
    (toastProp) => (
      // render custom toast
      <ToastComponent
        title={title}
        content={content}
        toastProp={toastProp}
        isError
      />
    ),
    options,
  );
}
