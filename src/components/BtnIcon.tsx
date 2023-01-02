import { IconType } from 'react-icons/lib';

interface Props {
  Icon: IconType;
  text: string;
  handleClick: () => void;
  customClass?: string;
}

const BtnIcon = ({ Icon, text, handleClick, customClass = '' }: Props) => {
  return (
    <>
      <span
        className={`absolute float-left min-w-max translate-x-[-110%] scale-0 rounded-xl bg-ghost-white px-3 py-2 text-xl font-bold text-bright-navy-blue transition-all duration-200 group-hover:scale-100 ${customClass}`}
      >
        {text}
      </span>
      <Icon
        className={`h-[4rem] w-[4rem] rounded-2xl bg-ghost-white text-bright-navy-blue transition-all duration-200 ease-linear hover:cursor-pointer hover:rounded-3xl hover:bg-bright-navy-blue hover:text-ghost-white ${customClass}`}
        onClick={() => handleClick()}
      />
    </>
  );
};

export default BtnIcon;
