import { Article } from "@/types";
import { ChevronRight, ShieldAlert } from "lucide-react";

export const aboutItem: Article = {
  title: "What is Configly?",
  subtitle:
    "Configly is an open-source, browser-based tool for converting configuration files between popular formats. It helps developers migrate configurations between tools, platforms, and environments without manually rewriting or restructuring their files.",
  icon: ChevronRight,
}

export const howItWork: Article = {
  title: "How Configly Works",
  subtitle:
    "Paste or upload your configuration, choose the target format, and let Configly handle the conversion in your browser. Your converted configuration is displayed with syntax highlighting and can be copied or downloaded with the appropriate file extension.",
  icon: ChevronRight,
}

export const privacyAndSecurity: Article = {
    title: "Privacy & Security",
    subtitle:
    "Your configuration stays on your device. Configly processes files directly in your browser, so your configuration is not uploaded to our servers, stored in a database, or sent to third-party services. Files are only processed locally to perform the conversion, giving you full control over your data.",
    icon: ShieldAlert,
}
