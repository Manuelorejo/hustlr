import Logo from "../../../components/Logo";

interface Props {
  children: React.ReactNode;
  title: string;
  subTitle: string;
}

const AuthLayout: React.FC<Props> = ({ children, title, subTitle }) => {
  return (
    <div className=" min-h-svh p-5 flex lg:items-center justify-center">
      <div className="max-w-[500px] flex flex-col items-center lg:justify-center gap-3">
        <Logo />
        <div className="space-y-1 text-center">
          <h2 className="text-2xl md:text-4xl font-semibold">{title}</h2>
          <p className="text-text italic text-sm md:text-base w-4/5 md:w-3/4 mx-auto">{subTitle}</p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
