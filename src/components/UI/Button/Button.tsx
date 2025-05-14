import './Button.scss';

interface ButtonProps {
  text: string;
  isActive: boolean;
  onHandleClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ text, isActive, onHandleClick }) => {
  return (
    <button className={`${isActive ? 'button_active ' : ''} button`} onClick={onHandleClick}>{text}</button>
  );
}