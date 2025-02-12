import { toast as sonnerToast } from 'sonner';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastOptions {
  title: string;
  description: string;
  type: ToastType;
}

export default function toast({ title, description, type = 'info' }: ToastOptions) {
  switch (type) {
    case 'success':
      sonnerToast.success(description, { id: title });
      break;
    case 'error':
      sonnerToast.error(description, { id: title });
      break;
    case 'warning':
      sonnerToast.warning(description, { id: title });
      break;
    default:
      sonnerToast.info(description, { id: title });
  }
}
