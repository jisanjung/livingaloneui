import { useStoreActions, useStoreState } from "../model"
import ConfirmModal from "./ConfirmModal"
import Tint from "./Tint"

const ConfirmDrawer = () => {

  const confirmed = useStoreState(state => state.postConfirm.triggered);
  const clearExpenseInput = useStoreActions(actions => actions.expense.clear);
  const togglePostConfirm = useStoreActions(actions => actions.postConfirm.toggle);

  return (
    <div className="relative z-10">
        <Tint
          onClick={() => {
            if (confirmed) {
              clearExpenseInput(null);
              togglePostConfirm(false);
            }
          }}
        />
        <ConfirmModal/>
    </div>
  )
}

export default ConfirmDrawer