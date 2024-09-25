import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type Props = {
  variant?: string;
  classNames?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  variant = '',
  classNames = '',
  ...props
}: PropsWithChildren<Props>) {
  return (
    <button
      className={`btn ${variant} ${classNames} inline-flex items-center gap-1 normal-case`}
      /*onClick={props.onClick}*/ {...props}
    >
      {children}
    </button>
  );
}
