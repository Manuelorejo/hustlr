import { TbLoader2 } from "react-icons/tb";
const LoadingScreen = () => {

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <TbLoader2 className="text-primary animate-spin text-6xl"/>
    </div>
  );
};

export default LoadingScreen;
