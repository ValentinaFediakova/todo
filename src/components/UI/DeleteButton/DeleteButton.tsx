import './DeleteButton.scss';

interface DeleteButtonProps {
  onHandleDelete: () => void;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({onHandleDelete}) => {
  return (
    <button className="deleteButton" onClick={onHandleDelete}></button>
  );
}