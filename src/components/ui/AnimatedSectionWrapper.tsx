
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedSectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fade-in' | 'fade-in-left' | 'fade-in-right' | 'scale-in';
  delay?: number;
}

const AnimatedSectionWrapper: React.FC<AnimatedSectionWrapperProps> = ({
  children,
  className,
  animation = 'fade-in',
  delay = 0,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  const animationClass = isVisible ? `animate-${animation}` : 'opacity-0';
  const delayStyle = delay ? { animationDelay: `${delay}ms` } : {};
  
  return (
    <div
      ref={sectionRef}
      className={cn(animationClass, className)}
      style={delayStyle}
    >
      {children}
    </div>
  );
};

export default AnimatedSectionWrapper;
