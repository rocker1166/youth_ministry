export function CampSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between mb-4">
          <div className="h-4 w-20 bg-gray-200 dark:bg-slate-700 rounded" />
          <div className="flex gap-2">
            <div className="h-8 w-8 bg-gray-200 dark:bg-slate-700 rounded-lg" />
            <div className="h-8 w-24 bg-gray-200 dark:bg-slate-700 rounded-lg" />
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Sidebar Skeleton */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
              <div className="aspect-[3/4] bg-gray-200 dark:bg-slate-700" />
              <div className="p-3 space-y-2">
                <div className="flex gap-1 justify-center">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-2 h-2 bg-gray-200 dark:bg-slate-700 rounded-full" />
                  ))}
                </div>
                <div className="h-8 bg-gray-200 dark:bg-slate-700 rounded-lg" />
              </div>
            </div>
          </div>

          {/* Content Skeleton */}
          <div className="lg:col-span-2 space-y-4">
            {/* Title Card */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-5 space-y-4">
              <div className="h-8 w-3/4 bg-gray-200 dark:bg-slate-700 rounded" />
              <div className="h-4 w-1/2 bg-gray-200 dark:bg-slate-700 rounded" />
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-20 bg-gray-200 dark:bg-slate-700 rounded-lg" />
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
              <div className="flex-1 h-12 bg-gray-200 dark:bg-slate-700 rounded-lg" />
              <div className="h-12 w-32 bg-gray-200 dark:bg-slate-700 rounded-lg" />
            </div>
          </div>
        </div>

        {/* Tabs Skeleton */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
          <div className="flex border-b border-gray-200 dark:border-slate-700">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="px-4 py-3">
                <div className="h-4 w-20 bg-gray-200 dark:bg-slate-700 rounded" />
              </div>
            ))}
          </div>
          <div className="p-5 space-y-4">
            <div className="h-4 w-full bg-gray-200 dark:bg-slate-700 rounded" />
            <div className="h-4 w-5/6 bg-gray-200 dark:bg-slate-700 rounded" />
            <div className="h-4 w-4/6 bg-gray-200 dark:bg-slate-700 rounded" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function CampListSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 animate-pulse">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Skeleton */}
        <div className="text-center mb-8 space-y-4">
          <div className="h-3 w-32 bg-gray-200 dark:bg-slate-700 rounded mx-auto" />
          <div className="h-10 w-3/4 bg-gray-200 dark:bg-slate-700 rounded mx-auto" />
          <div className="h-4 w-1/2 bg-gray-200 dark:bg-slate-700 rounded mx-auto" />
          <div className="h-10 w-40 bg-gray-200 dark:bg-slate-700 rounded mx-auto" />
        </div>

        {/* Card Skeleton */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-5">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="h-48 bg-gray-200 dark:bg-slate-700 rounded-lg" />
            <div className="space-y-4">
              <div className="h-6 w-3/4 bg-gray-200 dark:bg-slate-700 rounded" />
              <div className="h-4 w-1/2 bg-gray-200 dark:bg-slate-700 rounded" />
              <div className="grid grid-cols-2 gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-12 bg-gray-200 dark:bg-slate-700 rounded" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Highlights Skeleton */}
        <div className="grid md:grid-cols-3 gap-4 mt-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-4 space-y-3">
              <div className="h-10 w-10 bg-gray-200 dark:bg-slate-700 rounded-lg" />
              <div className="h-4 w-1/2 bg-gray-200 dark:bg-slate-700 rounded" />
              <div className="space-y-2">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="h-3 w-full bg-gray-200 dark:bg-slate-700 rounded" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
