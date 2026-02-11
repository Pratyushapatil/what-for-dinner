import AddButtonProps from './AddButton.props'

const AddButton = (props: AddButtonProps) => (
  <button
    type="button"
    className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-200 text-emerald-700 shadow-sm font-extrabold "
    onClick={props.onClick}
  >
    {props.label ?? 'Add'}
  </button>
)

export default AddButton
