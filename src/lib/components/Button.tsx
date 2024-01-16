import { cva, VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const buttonStyles = cva(
  "rounded-sm inline-flex items-center justify-center space-x-1 outline-none",
  {
    variants: {
      variant: {
        dark: "bg-gray-900 hover:bg-gray-800 text-gray-400 hover:text-white focus:ring focus:ring-gray-400",
        success:
          "bg-green-700 hover:bg-green-800 text-green-200 hover:text-white focus:ring focus:ring-green-400",
        danger:
          "bg-red-700 hover:bg-red-800 text-red-200 hover:text-white focus:ring focus:ring-red-400",
      },
      size: {
        large: "text-sm px-4 py-2",
        medium: "text-xs px-3 py-2",
        small: "text-[10px] px-2 py-1",
      },
    },
    defaultVariants: {
      variant: "dark",
      size: "medium",
    },
  }
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonStyles>;

export const Button: React.FC<ButtonProps> = ({
  variant,
  size,
  children,
  className,
  ...rest
}) => (
  <button
    className={twMerge(buttonStyles({ variant, size }), className)}
    {...rest}
  >
    {children}
  </button>
);
