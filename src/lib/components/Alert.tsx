import { VariantProps, cva } from "class-variance-authority";
import { useEffect, useRef } from "react";

const alertStyles = cva("py-3 px-4 rounded-sm text-center text-sm", {
  variants: {
    variant: {
      success: "bg-green-300/20 text-green-500",
      error: "bg-red-300/20 text-red-500",
      info: "bg-blue-300/20 text-blue-500",
    },
  },
  defaultVariants: {
    variant: "success",
  },
});

const defaultTimeout = 1500;

type AlertProps = React.PropsWithChildren &
  VariantProps<typeof alertStyles> & {
    autoClose?: boolean;
    timeout?: number;
  };

export const Alert = ({
  children,
  variant,
  autoClose = true,
  timeout: alertTimeout,
}: AlertProps) => {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const timeout =
      autoClose &&
      setTimeout(() => {
        ref.current?.remove();
      }, alertTimeout ?? defaultTimeout);

    return () => {
      timeout && clearTimeout(timeout);
    };
  }, []);

  return (
    <p ref={ref} className={alertStyles({ variant })}>
      {children}
    </p>
  );
};
