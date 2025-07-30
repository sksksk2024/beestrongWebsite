import AnimatedSVG from './AnimatedSVG';

type PlusProps = {
  className?: string;
};

const Plus = ({ className }: PlusProps) => {
  return (
    <AnimatedSVG
      width={40}
      height={20}
      strokeWidth={2}
      stroke="currentColor"
      fill="none"
      pathData="M4 12H20M12 4V20"
      className={`text-white hover:text-warning transition-colors duration-200
        ${className}
        `}
      label="plus-icon"
      viewBox="0 0 24 24"
    />
  );
};

export default Plus;
