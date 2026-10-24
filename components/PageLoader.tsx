export default function PageLoader() {
  return (
    <div aria-hidden className="page-loader fixed inset-0 z-[9999] flex items-center justify-center bg-black">
      <div className="text-center">
        <p className="page-loader-logo text-6xl font-bold text-white">
          UMER<span className="text-red-500">.</span>
        </p>
        <div className="page-loader-bar mx-auto mt-6 h-[3px] bg-red-500" />
      </div>
    </div>
  );
}
