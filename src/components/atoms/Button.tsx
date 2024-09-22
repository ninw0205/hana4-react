type Props = {
  text: string;
  variant?: string;
  classNames?: string;
};

export default function Button({ text, variant = '', classNames = '' }: Props) {
  return <button className={`btn ${variant} ${classNames}`}>{text}</button>;
}
