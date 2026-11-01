import { IoAlertCircle, IoCheckmarkCircle } from "react-icons/io5";

export interface ToastState {
  kind: 'success' | 'error';
  message: string;
};

interface ToastProps {
  toast: ToastState | null;
};

const Toast = ({ toast }: ToastProps) => {
  const visible = Boolean(toast);
  const isError = toast?.kind === 'error';

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed left-4 right-4 z-20 top-[max(env(safe-area-inset-top),12px)] flex justify-center pointer-events-none transition-all duration-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'}`}
    >
      {toast && (
        <div className={`flex items-center gap-2 px-4 py-3 rounded-full shadow-lg font-semibold text-white ${isError ? 'bg-red-500' : 'bg-emerald-600'}`}>
          {isError ? <IoAlertCircle className="text-xl"/> : <IoCheckmarkCircle className="text-xl"/>}
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  )
}

export default Toast
