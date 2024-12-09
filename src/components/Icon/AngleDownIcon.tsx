const AngleDownIcon: React.FC<{ cssStyle: string }> = (cssStyle) => {
  return (
    <svg
      className={`w-3 h-3 ${cssStyle}`}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 10 6"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m1 1 4 4 4-4"
      />
    </svg>
  );
};

export default AngleDownIcon;
