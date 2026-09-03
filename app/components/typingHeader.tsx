'use client';

import { ReactTyped } from 'react-typed';

const typingStrings = [
  "SOFTWARE AUTOMATION TEST ENGINEER",
  "DATA/SYSTEMS ANALYST",
  "SOFTWARE DEVELOPER",
  "MULTIDISCIPLINARY ARTIST",
]

export default function TypingHeader() {
  return (
    <ReactTyped 
      className="font-mono text-2xl text-navy overflow-hidden text-start" 
      typeSpeed={30}
      backDelay={1500} 
      backSpeed={15} 
      loop 
      strings={typingStrings} 
    />
  );
}