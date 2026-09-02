import TypingHeader from './components/typingHeader'
import Image from 'next/image';

export default function Page() {
  return (
    <section className="w-full max-w-2xl">
      <div className="mb-8 flex items-center gap-4">
        <Image
          src="/pfp.png"
          alt="Profile picture"
          width={128}
          height={128}
          className="rounded-full object-cover shrink-0"
        />
        <h1 className="text-4xl font-semibold tracking-tighter">
          Renato Torres is a:
        </h1>
      </div>
      <div className="mb-8 w-max">
        <TypingHeader />
      </div>
      
      <p className="mb-4">
        Computer Science B.S. graduate with professional experience in C++, JavaScript, 
        Dart, and MATLAB. My experience includes developing software and automation tools, 
        building testing infrastructure, data processing/visualization, and working with 
        interactive applications. 
        <br />
        <br />
        I enjoy solving complex technical problems and learning 
        new technologies. I'm looking for opportunities to grow as a developer while 
        contributing to creative and challenging projects.
      </p>
      {/* <div className="my-8">
        <BlogPosts />
      </div> */}
      <div className="mt-8 pl-8">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
          Currently
        </h3>
        <ul className="mt-2 list-disc list-inside space-y-1.5 text-sm text-neutral-600 dark:text-neutral-400">
          <li>Seeking software engineering, developer, test automation, or creative tech roles</li>
          <li>Deepening data structure & system performance knowledge</li>
          <li>Experimenting between technology, visual art, and sound</li>
          <li>Building interactive web experiences</li>
        </ul>
      </div>
    </section>
  )
}
