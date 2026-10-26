"use client";

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Footer = () => {
  const pathName = usePathname();
  const isHome = pathName === '/';
  return (
    <footer className='border-t text-muted '>
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 px-6 py-6 text-xs text-muted-foreground sm:flex-row sm:items-start">
        <div>
          <p className='text-center sm:text-left'>
            Made by
            <a href="https://github.com/it-chhean" title='github.com/it-chhean' target='_blank' rel='noopener noreferrer' className='ml-1 text-primary underline'>@it-chhean</a>
          </p>
        </div>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:justify-start">
            {isHome ? (
              <>
                <Link
                  href="/documents#about-link"
                  className="duration-200 hover:text-primary hover:underline"
                >
                  Docs
                </Link>


                <Link
                  href="/documents#privacy-link"
                  className="duration-200 hover:text-primary hover:underline"
                >
                  Privacy
                </Link>
                <span>©2026 Configly</span>
              </>
            ) : (
                <>
                <Link
                  href="/#faq-link"
                  className="duration-200 hover:text-primary hover:underline"
                >
                  FAQs
                </Link>
                <a
                  href="/"
                  className="scroll-mt-55 duration-200 hover:text-primary hover:underline"
                >
                  Return to Home
                </a>
                </>
            )}
        </div>
      </div>
    </footer>
  )
}

export default Footer
