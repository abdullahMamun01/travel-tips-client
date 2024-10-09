type StatsOverviewProps = {
    posts: number
    followers: number
    following: number
  }
  
  export default function StatsOverview({ posts, followers, following }: StatsOverviewProps) {
    return (
      <div className="flex justify-center md:justify-start mt-6 space-x-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{posts}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Posts</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{followers.toLocaleString()}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Followers</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{following.toLocaleString()}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Following</p>
        </div>
      </div>
    )
  }
  