import CustomImageViewer from '../components/imageViewer';
import CustomMusicPlayer from '../components/musicPlayer';
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Art Showcase',
};

export default function ArtShowcase() {
  return (
      <div className="flex flex-col gap-6 max-w-2xl">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-medium tracking-tight text-black dark:text-white">
            Art Showcase
          </h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Original music, visual art, and custom-built components. Everything you see was created by me as personal projects.
          </p>
        </div>
        <div className="flex flex-col items-center w-full max-w-2xl gap-6">
          <CustomImageViewer />
          <CustomMusicPlayer />
        </div>
      </div>
  )
}
