import { ButtonHTMLAttributes } from 'react';

type Props = {
  text: string;
  variant?: string;
  classNames?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  text,
  variant = '',
  classNames = '',
  ...props
}: Props) {
  return (
    <button
      className={`btn ${variant} ${classNames}`}
      /*onClick={props.onClick}*/ {...props}
    >
      {text}
    </button>
  );
}
