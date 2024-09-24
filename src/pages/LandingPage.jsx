import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useState } from "react";
import { useNavigate } from "react-router-dom";



const LandingPage = () => {
  const navigate = useNavigate();
  const [longUrl, setLongUrl] = useState('')

  const handleShorten = (e) => {
    e.preventDefault()
    if(longUrl){
      navigate(`/auth?createNew=${longUrl}`);
    }
    console.log('Shorten URL:', longUrl);
  }

  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-8 lg:p-16">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl my-10 sm:my-16 font-extrabold drop-shadow-lg">
        The only URL shortener you&apos;ll ever need 🚀
      </h2>
      <form onSubmit={handleShorten} className="flex flex-col sm:flex-row gap-4 sm:gap-8 w-full md:w-2/4">
        <Input
          className="flex-1 p-2 h-full sm:p-4 rounded-md shadow-md"
          type='url'
          onChange={(e) => setLongUrl(e.target.value)}
          value={longUrl}
          placeholder='Enter your URL here'
        />
        <Button
          className="p-2 sm:p-4 h-full font-semibold"
          type='submit'
          variant='destructive'
        >
          Shorten!
        </Button>
      </form>

      <Accordion type="multiple" collapsible className="w-full md:p-11">
        <AccordionItem value="item-1">
          <AccordionTrigger>What is Link Shrink?</AccordionTrigger>
          <AccordionContent>
            A service that shortens long URLs for easy sharing.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>How does Link Shrink work?</AccordionTrigger>
          <AccordionContent>
            Paste your URL, click Shrink Link, and get a short link.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>Is Link Shrink free?</AccordionTrigger>
          <AccordionContent>
            Yes, Link Shrink is free to use for everyone.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>Do the links expire?</AccordionTrigger>
          <AccordionContent>
            No, links don&apos;t expire unless you delete them.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger>Can I track clicks on my links?</AccordionTrigger>
          <AccordionContent>
            Yes, you can view click analytics.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6">
          <AccordionTrigger>Can I customize my short links?</AccordionTrigger>
          <AccordionContent>
            Yes, you can customize your short links.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-7">
          <AccordionTrigger>How do I delete my links?</AccordionTrigger>
          <AccordionContent>
            You can delete your links from the dashboard.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-8">
          <AccordionTrigger>Why use Link Shrink?</AccordionTrigger>
          <AccordionContent>
            It makes sharing URLs easier and provides analytics.
          </AccordionContent>
        </AccordionItem>
      </Accordion>

    </div>
  )
}

export default LandingPage
