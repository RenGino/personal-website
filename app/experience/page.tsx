import { DevPosts } from '@/app/components/posts'

export const metadata = {
  title: 'Development Experiences',
  description: 'Read my development experiences.',
}

export default function Page() {
  const skills = [
    {
      category: 'Core Competencies',
      items: ['Software Engineering', 'Web Development', 'Game Development', 'Software Testing'],
    },
    {
      category: 'Languages',
      items: ['C++', 'C#','Python', 'JavaScript', 'TypeScript', 'Dart', 'Kotlin', 'MATLAB', 'SysML'],
    },
    {
      category: 'Frameworks & Libraries',
      items: ['React', 'Next.js', 'Tailwind CSS', 'Flutter', 'Unity', 'OpenGL', 'Isar (NoSQL)'],
    },
    {
      category: 'Tools & Platforms',
      items: ['Git', 'Supabase', 'PostgreSQL', 'Jira', 'Android Studio', 'TestComplete', 'Microsoft Power Platform', 'Blender', 'Adobe Creative Suite'],
    },
  ]
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
        Development Experiences
      </h1>      
      <DevPosts />
      
      <div className="mt-16 mb-16 pt-8 border-t border-neutral-200 dark:border-neutral-700">
        <h2 className="font-semibold text-2xl mb-8 tracking-tighter">
          Technical Skills
        </h2>
        <div className="space-y-6">
          {skills.map((group) => (
            <div key={group.category} className="flex flex-col md:flex-row md:items-baseline space-y-2 md:space-y-0 md:space-x-4">
              <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100 shrink-0 md:w-40">
                {group.category}
              </span>
              <div className="flex flex-wrap gap-2 flex-1 max-w-xl">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800/60 text-neutral-600 dark:text-neutral-400 border border-neutral-200/50 dark:border-neutral-700/50"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
