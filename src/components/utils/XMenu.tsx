import AnimatedSVG from './AnimatedSVG';

type MenuProps = {
  className?: string;
};

const XMenu = ({ className }: MenuProps) => {
  return (
    <AnimatedSVG
      width={40}
      height={30}
      strokeWidth={6}
      stroke="currentColor"
      fill="currentColor" // Added this to make the fill color consistent with the stroke color
      pathData="M4 4 L60 60 M4 60 L60 4"
      className={`z-50 text-yellowCustom group-hover:text-warning ${className}`}
      label="close-menu"
      viewBox="0 0 64 64"
    />
  );
};

export default XMenu;
