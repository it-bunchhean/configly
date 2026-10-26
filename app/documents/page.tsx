import ArticleSection from "@/components/sections/ArticleSection"
import ConversationSection from "@/components/sections/ConversationSection"
import ReferenceSection from "@/components/sections/ReferenceSection"
import { aboutItem, howItWork, privacyAndSecurity } from "@/data/docs"

const page = () => {
  return (
		<section className="mx-auto w-full max-w-5xl my-10 flex-1 px-6">
      <div id="about-link" className="scroll-mt-52 my-15">
        <ArticleSection article={aboutItem}/>
      </div>
      <div id="how-it-work-link" className="scroll-mt-52 my-15">
        <ArticleSection article={howItWork}/>
      </div>
      <div id="privacy-link" className="scroll-mt-52 my-15">
        <ArticleSection article={privacyAndSecurity}/>
      </div>
      <div id="conversation-link" className="scroll-mt-52 my-15">
      <ConversationSection/>
      </div>
      <div id="reference-link" className="scroll-mt-52 my-15">
      <ReferenceSection/>
      </div>
		</section>
  )
}

export default page
