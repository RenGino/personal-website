import { notFound } from 'next/navigation'
import { CustomMDX } from '@/app/components/mdx'
import { formatDate, getDevPosts } from '@/app/experience/utils'
import { baseUrl } from '@/app/sitemap'

export async function generateStaticParams() {
  let posts = getDevPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let post = getDevPosts().find((post) => post.slug === slug)
  if (!post) {
    return
  }

  let {
    title,
    endDate: publishedTime,
    summary: description,
    image,
  } = post.metadata
  let ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/dev/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export default async function DevPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  let post = getDevPosts().find((post) => post.slug === slug)

  if (!post) {
    notFound()
  }

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'DevPosting',
            headline: post.metadata.title,
            datePublished: post.metadata.endDate,
            dateModified: post.metadata.endDate,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${baseUrl}/dev/${post.slug}`,
            author: {
              '@type': 'Person',
              name: 'My Portfolio',
            },
          }),
        }}
      />
      <h1 className="title font-semibold text-3xl tracking-tighter">
        {post.metadata.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-4 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(post.metadata.startDate)} - {formatDate(post.metadata.endDate)}
          <br/>
          {post.metadata.location}
        </p>
      </div>
      {post.metadata.skills && post.metadata.skills.length > 0 && (
        <div className="mb-4 pb-6 border-b border-neutral-200 dark:border-neutral-700">
          {/* <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block mb-2.5">
            Skills & Tools Used
          </span> */}
          <div className="flex flex-wrap gap-2">
            {post.metadata.skills.map((skill: string) => (
              <span
                key={skill}
                className="text-xs px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800/60 text-neutral-600 dark:text-neutral-400 border border-neutral-200/50 dark:border-neutral-700/50 font-mono"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
      <article className="prose">
        <CustomMDX source={post.content} />
      </article>
    </section>
  )
}
