import DeleteButtonProps from './DeleteButton.props'

const DeleteButton = (props: DeleteButtonProps) => (
  <button
    type="button"
    className="ml-auto flex h-8 w-8 items-center justify-center text-red-700 font-bold"
    onClick={props.onClick}
  >
    {props.label ?? 'Delete'}
  </button>
)

export default DeleteButton
