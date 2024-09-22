interface Props {
  type: string;
  number: number | undefined;
  displayNumber: boolean;
  bgColor: string;
}

export default function HeaderSquare({
  type,
  number,
  displayNumber,
  bgColor,
}: Props) {
  const classModifier: string =
    type === "home" ? "" : "mr-2 mb-2 last-of-type:mb-0";
  const className: string = `flex flex-grow flex-wrap border border-white rounded justify-center items-center text-3xl shadow-sm ${bgColor} [text-shadow:_2px_1px_2px_rgb(0_0_0_/_40%)] ${classModifier}`;

  return (
    <div
      className={className}
      data-testid={`${type}${number}`}
    >
      {displayNumber && number}
    </div>
  );
}
