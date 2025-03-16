import { useStoreActions } from "../model";

interface TintProps {
  onClick: () => void;
};

const Tint = ({ onClick }: TintProps) => {

    const togglePreConfirm = useStoreActions(actions => actions.preConfirm.toggle);

  return (
    <div className="fixed inset-0"
        style={{ background: 'rgba(0, 0, 0, 0.5)' }}
        onClick={() => {
            togglePreConfirm(false);
            onClick();
        }}
    ></div>
  )
}

export default Tint