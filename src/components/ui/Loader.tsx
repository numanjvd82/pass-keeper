import { Oval } from "react-loader-spinner";

export const Loader = ({ className = "" }: { className?: string }) => {
  return (
    <div className={className}>
      <Oval
        visible={true}
        height="80"
        width="80"
        color="hsl(180 62% 71%)" // bg-primary
        ariaLabel="oval-loading"
        secondaryColor="hsl(180 9% 82%)" // bg-secondary
        wrapperClass=""
      />
    </div>
  );
};

export default function Splash() {
  return (
    <div className="bg-white dark:bg-black h-screen flex justify-center items-center bg-primary ">
      <Loader />
    </div>
  );
}
