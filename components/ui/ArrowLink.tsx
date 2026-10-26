import { Props } from '@/types';

export default function ArrowLink({
   href,
   name
}: Props ) {
   return (
      <a
         href={href}
         rel="noopener noreferrer"
         className="group inline-flex items-center gap-1.5 text-primary transition-opacity duration-150 hover:opacity-100"
      >
         <span className="text-base font-normal"> 
            {name}
         </span>
      </a>
   );
}
