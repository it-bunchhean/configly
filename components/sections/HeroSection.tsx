import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative grid mx-auto max-w-5xl justify-center">
      <div className="pt-20 pb-10 ">
        <h2 className="text-center text-3xl font-normal tracking-tight text-j-900 sm:text-5xl  dark:text-neutral-400">
          Convert your Config File{" "}
          <span className="font-normal dark:text-white">Instantly</span>
        </h2>
        <div>
          <p className="mt-4 mx-auto max-w-xl text-base text-center text-muted dark:text-neutral-300">
            Fast, reliable configuration file conversion across platform. No
            uploads, no servers, your data is processed locally in your browser.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
