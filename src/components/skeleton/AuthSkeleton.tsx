

export default function AuthSkeleton() {
  return (
    <div className="flex items-center space-x-4 p-2 ">
      {/* Skeleton for "Create Post" button */}
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse" />
        <div className="w-24 h-8 bg-gray-300 rounded-md animate-pulse" />
      </div>
      
      {/* Skeleton for notification icon */}
      <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse" />
      
      {/* Skeleton for profile avatar */}
      <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse" />
    </div>
  );
}
