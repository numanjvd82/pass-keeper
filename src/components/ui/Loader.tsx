import { Oval } from "react-loader-spinner";

export default function Loader() {
  return (
    <Oval
      visible={true}
      height="80"
      width="80"
      color="#0f172a"
      ariaLabel="oval-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
}
