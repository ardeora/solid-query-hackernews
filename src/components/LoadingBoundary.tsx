import { Loading } from "./Icons";

const LoadingBoundary = () => {
  return (
    <div class="h-12 bg-gray-50 border-b border-gray-200 items-center flex justify-center">
      <span class="h-5 w-5 text-gray-500 animate-spin">
        <Loading />
      </span>
    </div>
  );
};

export default LoadingBoundary;
