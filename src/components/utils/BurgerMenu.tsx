import AnimatedSVG from './AnimatedSVG';

type Menu = {
  className: string;
};

const BurgerMenu = ({ className }: Menu) => {
  return (
    <AnimatedSVG
      className={`${className}`}
      label="burger-menu"
      pathData="M2 6h20c.55 0 1 .45 1 1s-.45 1-1 1H2c-.55 0-1-.45-1-1s.45-1 1-1zm0 5h20c.55 0 1 .45 1 1s-.45 1-1 1H2c-.55 0-1-.45-1-1s.45-1 1-1zm0 5h20c.55 0 1 .45 1 1s-.45 1-1 1H2c-.55 0-1-.45-1-1s.45-1 1-1z"
    />
  );
};

export default BurgerMenu;
