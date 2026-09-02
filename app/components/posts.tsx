import Link from 'next/link'
import { formatDate, getDevPosts } from '@/app/experience/utils'

export function DevPosts() {
  let allDevPosts = getDevPosts()

  return (
    <div>
      {allDevPosts
        .sort((a, b) => {
          if (
            new Date(a.metadata.endDate) > new Date(b.metadata.endDate)
          ) {
            return -1
          }
          return 1
        })
        .map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col space-y-1 mb-4 group"
            href={`/experience/${post.slug}`}
          >
            <div className="w-full flex flex-col md:flex-row md:items-baseline space-y-1 md:space-y-0 md:space-x-4">
              <p className="text-neutral-600 dark:text-neutral-400 text-sm tabular-nums shrink-0 md:w-40">
                {formatDate(post.metadata.startDate)} — {formatDate(post.metadata.endDate)}
              </p>
              <p className="text-neutral-900 dark:text-neutral-100 tracking-tight font-medium">
                {post.metadata.title}
              </p>
            </div>
          </Link>
        ))}
    </div>
  )
}
