'use client';

import { ReactTyped } from 'react-typed';

export default function TypingHeader() {
  return (
    <ReactTyped 
      className="font-mono text-2xl text-navy overflow-hidden text-start" 
      typeSpeed={40} 
      backDelay={1500} 
      backSpeed={50} 
      loop 
      strings={[ "Software Automation Test Engineer", "Data/Systems Analyst", 
        "Software Developer", "Multidisciplinary Artist" ]} 
    />
  );
}