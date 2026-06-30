function PageLoader() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="skeleton mb-6 h-10 w-2/3 rounded-2xl" />
      <div className="skeleton mb-10 h-5 w-1/2 rounded-xl" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="skeleton h-64 rounded-2xl" />
        ))}
      </div>
    </div>
  )
}

export default PageLoader
