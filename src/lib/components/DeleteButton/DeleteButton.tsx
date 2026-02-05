import DeleteButtonProps from "./DeleteButton.props";

const DeleteButton = ( props: DeleteButtonProps) => (
  <button
    type="button"
    className={`text-sm text-white-600 bg-red-700 px-2 py-2 rounded`}
    onClick={props.onClick}
>
    {props.label ?? 'Delete'}
  </button>
)

export default DeleteButton;