import { ChangeEvent, InputHTMLAttributes, useId } from 'react';

type Props = {
  label: string;
  type?: string;
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  classNames?: string;
  inputAttrs?: InputHTMLAttributes<HTMLInputElement>;
};
export default function LabelInput({
  label,
  inputAttrs,
  type = 'text',
  placeholder = `${label}...`,
  onChange = () => {},
  classNames = '',
}: Props) {
  const id = useId();
  // console.log('🚀 ~ id:', id);
  return (
    <div className='my-3 flex'>
      <label htmlFor={id} className='w-32'>
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        id={id}
        className={`inp ${classNames}`}
        onChange={onChange}
        {...inputAttrs}
      />
    </div>
  );
}
