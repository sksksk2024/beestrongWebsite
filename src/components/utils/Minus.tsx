import AnimatedSVG from './AnimatedSVG';

type MinusProps = {
  className?: string;
};

const Minus = ({ className }: MinusProps) => {
  return (
    <AnimatedSVG
      width={40}
      height={20}
      strokeWidth={2}
      stroke="currentColor"
      fill="none"
      pathData="M4 12H40"
      className={`text-yellow-400 hover:text-warning transition-colors duration-200
        ${className}
        `}
      label="minus-icon"
      viewBox="0 0 24 24"
    />
  );
};

export default Minus;
