import Image from 'next/image';
import toast, { Toast as ReactToast } from 'react-hot-toast';
import clsxm from '../../shared/lib/clsxm';

interface SuccessToastProps {
  title?: string;
  content: string;
  toastProp: ReactToast;
  isError?: boolean;
}

export default function ToastComponent({
  title,
  content,
  isError,
  toastProp,
}: Readonly<SuccessToastProps>) {
  const closeToast = () => {
    toast.dismiss(toastProp.id);
  };
  return (
    <div
      className={clsxm(
        'shadow-typ3 flex min-w-[300px] max-w-[500px] items-center rounded-[6px] border-l-4 px-4 py-2 text-[16px] leading-6',
        isError ? 'border-l-[#CE092F]' : 'border-l-[#52C41A]'
      )}
    >
      {isError ? (
        <Image
          src='/svg/error-warning.svg'
          width={24}
          height={24}
          alt='error-toast'
          className='mr-2'
        />
      ) : (
        <Image
          src='/svg/checked-circle.svg'
          width={24}
          height={24}
          alt='success-toast'
          className='mr-2'
        />
      )}
      <div className='mr-2'>
        {title && <div className='font-bold text-[#0D0D0D]'>{title}</div>}
        <div className='text-[#171717]'>{content}</div>
      </div>
      <Image
        src='/svg/close.svg'
        width={24}
        height={24}
        alt='close'
        className='ml-auto cursor-pointer'
        data-testid='close-icon'
        onClick={closeToast}
      />
    </div>
  );
}
