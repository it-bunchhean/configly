import { Feature } from "@/types";
import { Zap, Lock, Code } from "lucide-react";

export const features: Feature[] = [
   {
    id: 1,
    title: "100% Private & Secure",
    description: "All conversions happen in your browser. Your configuration files never leave your device - no server uploads, complete privacy.",
    icon: Lock,
   },
   {
    id: 2,
    title: "Developer Friendly",
    description: "Built for developers by developers. Support for all major configuration formats used in modern software development.",
    icon: Code,
   },
   {
    id: 3,
    title: "Instant Conversion",
    description: "See results in real-time as you type. No waiting, no processing delays - instant conversion using client-side JavaScript.",
    icon: Zap,
   }  
]