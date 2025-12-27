import { cn } from '../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline';
}

export const Button = ({ className, variant = 'default', ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded font-medium transition-colors',
        variant === 'default' && 'bg-blue-600 text-white hover:bg-blue-700',
        variant === 'outline' && 'border border-gray-300 hover:bg-gray-100',
        className
      )}
      {...props}
    />
  );
};
