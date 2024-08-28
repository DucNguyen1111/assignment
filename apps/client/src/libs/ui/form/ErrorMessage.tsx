import clsxm from "../../shared/lib/clsxm";

interface ErrorMessageProps {
  message: string | undefined;
  className?: string;
}

export default function ErrorMessage({
  message,
  className,
}: Readonly<ErrorMessageProps>) {
  return (
    <div
      className={clsxm('error-message text-[12px] text-[#CE092F]', className)}
    >
      {message}
    </div>
  );
}
