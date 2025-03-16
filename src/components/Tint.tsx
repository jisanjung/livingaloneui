import { useStoreActions } from "../model"

const Tint = () => {

    const togglePreConfirm = useStoreActions(actions => actions.preConfirm.toggle);

  return (
    <div className="fixed inset-0"
        style={{ background: 'rgba(0, 0, 0, 0.5)' }}
        onTouchStart={() => {
            togglePreConfirm(false);
        }}
    ></div>
  )
}

export default Tint