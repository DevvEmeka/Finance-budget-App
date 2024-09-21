import GridItems from "../overview/GridItems";
import Button from "./Button";
import SpinnerMini from "./SpinnerMini";

type deleItm = {
  item: string;
  deleteFn?: () => void;
  close: () => void;
  loading: boolean;
};
function DeleteModal({ item, deleteFn, close, loading }: deleItm) {
  return (
    <GridItems className="w-full h-full px-0 flex flex-col gap-5 ">
      <p className="text-sm text-grey-500  mb-4">
        Are you sure you want to delete this {item}? This action cannot be
        reversed, and all the data inside it will be removed forever.
      </p>

      <Button
        className="flex items-center justify-center"
        type="danger"
        onClick={deleteFn}
      >
        {loading ? <SpinnerMini /> : "  Yes Confirm deletion"}
      </Button>

      <Button
        className="flex items-center justify-center"
        type="secondary"
        onClick={close}
      >
        No i want to go back
      </Button>
    </GridItems>
  );
}

export default DeleteModal;
