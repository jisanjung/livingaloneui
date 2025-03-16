import { useStoreActions } from "../model";

interface TintProps {
  functionOnTap: () => void;
};

const Tint = ({ functionOnTap }: TintProps) => {

    const togglePreConfirm = useStoreActions(actions => actions.preConfirm.toggle);

  return (
    <div className="fixed inset-0"
        style={{ background: 'rgba(0, 0, 0, 0.5)' }}
        onTouchStart={() => {
            togglePreConfirm(false);
            functionOnTap();
        }}
    ></div>
  )
}

export default Tint