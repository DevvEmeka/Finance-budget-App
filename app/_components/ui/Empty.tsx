import GridItems from "../overview/GridItems";

type EmptyProp = {
  name: string;
};

function Empty({ name }: EmptyProp) {
  return (
    <GridItems className="h-full flex items-center justify-center">
      <p className="text-grey-500">{name} has no activities yet</p>
    </GridItems>
  );
}

export default Empty;
