export default function Loading() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center" role="status" aria-label="Loading">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-line border-t-brand" />
    </div>
  );
}
