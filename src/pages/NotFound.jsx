export default function NotFound() {
  return (
    <div className="px-6 py-24 text-center">
      <p className="text-sm tracking-widest text-neutral-400 mb-2">ERROR 404</p>
      <h1 className="text-3xl font-semibold mb-3">This page wandered off.</h1>
      <p className="text-neutral-500">
        Whatever you were looking for isn't here. Try heading back to the blog.
      </p>
    </div>
  );
}