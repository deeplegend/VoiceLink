// src/app/(dashboard)/help/page.tsx

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { faqData } from "@/app/(dashboard)/help-support/data/data";

export default function HelpPage() {
    return (
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-background">
            <div className="mx-auto w-full max-w-4xl p-4 space-y-10 lg:p-8">
                
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">Help & Support</h1>
                    <p className="text-muted-foreground text-lg">
                        Find answers to common questions and learn how to get the most out of VoiceLink.
                    </p>
                </div>

                <div className="space-y-12">
                    {faqData.map((category) => (
                        <div key={category.title} className="space-y-4">
                            
                            <h2 className="text-xl font-semibold tracking-tight border-b pb-2">
                                {category.title}
                            </h2>
                            
                            <Accordion type="single" collapsible className="w-full">
                                {category.items.map((item) => (
                                    <AccordionItem key={item.id} value={item.id}>
                                        <AccordionTrigger className="text-left font-medium hover:no-underline hover:text-primary transition-colors">
                                            {item.question}
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground leading-relaxed pt-2 pb-4">
                                            <div className="space-y-4">
                                                <p>{item.answer}</p>
                                                {item.youtubeId && (
                                                    <div className="aspect-video w-full overflow-hidden rounded-xl border bg-muted shadow-sm">
                                                        <iframe
                                                            width="100%"
                                                            height="100%"
                                                            src={`https://www.youtube.com/embed/${item.youtubeId}?rel=0`}
                                                            title={item.question}
                                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                            allowFullScreen
                                                            className="border-0"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    ))}
                </div>
                
            </div>
        </div>
    );
}