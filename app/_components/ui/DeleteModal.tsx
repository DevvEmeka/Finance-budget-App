import GridItems from "../overview/GridItems";
import Button from "./Button";

type deleItm = {
  item: string;
};
function DeleteModal({ item }: deleItm) {
  return (
    <GridItems className="w-full h-full px-0 flex flex-col gap-5 ">
      <p className="text-sm text-grey-500  mb-4">
        Are you sure you want to delete this {item}? This action cannot be
        reversed, and all the data inside it will be removed forever.
      </p>

      <Button className="flex items-center justify-center" type="danger">
        Yes Confirm deletion
      </Button>

      <Button className="flex items-center justify-center" type="secondary">
        No i want to go back
      </Button>
    </GridItems>
  );
}

export default DeleteModal;
