export interface QuickAction {
    title: string;
    description: string;
    gradient: string;
    href: string;
}

export const quickActions: QuickAction[] = [
    {
        title: "Narrate an Audiobook",
        description: "Produce professional-grade narration for stories and media.",
        gradient: "from-cyan-400 to-cyan-50",
        href: "/text-to-speech?text=Chapter One. The city of Aethelgard stood as a testament to the old kings, its spires piercing the eternal fog. Elara pulled her cloak tighter, knowing the secrets hidden within its walls could alter the course of history forever.",
    },
    {
        title: "Listen to Study Notes",
        description: "Convert textbook summaries into audio for easy revision.",
        gradient: "from-pink-400 to-pink-100",
        href: "/text-to-speech?text=Key takeaway for today's biology review: Mitochondria are known as the powerhouses of the cell. They generate most of the chemical energy needed to power the cell's biochemical reactions, storing it in a molecule called ATP.",
    },
    {
        title: "Record Lecture Audio",
        description: "Create accessible audio versions of your course materials.",
        gradient: "from-violet-500 to-violet-100",
        href: "/text-to-speech?text=Welcome to Introduction to Economics, week three. Today, we will be exploring the fundamental principles of supply and demand. By the end of this module, you should be able to analyze how market equilibrium shifts in response to external factors.",
    },
    {
        title: "Voice an NPC",
        description: "Generate immersive character dialogue and in-game lore.",
        gradient: "from-orange-400 to-orange-100",
        href: "/text-to-speech?text=Halt, traveler! The roads beyond this checkpoint are swarming with goblins. If you intend to cross the Whispering Woods, you'll need better armor than that. I can sell you a few pieces, but it won't come cheap.",
    },
    {
        title: "Voiceover a Video",
        description: "Engage your audience with dynamic audio for digital content.",
        gradient: "from-blue-500 to-blue-100",
        href: "/text-to-speech?text=Here are three psychological tricks that will change the way you interact with people! Number one: the power of the pause. Next time you ask a question, just wait. The silence will prompt the other person to share more than they originally planned.",
    },
    {
        title: "Introduce Your Podcast",
        description: "Hook your listeners from the very first second of your show.",
        gradient: "from-lime-400 to-lime-100",
        href: "/text-to-speech?text=Welcome back to 'Deep Dive Daily'. Today, we are unpacking the latest trends in artificial intelligence and how they impact our everyday lives. Grab your coffee, settle in, and let's get straight into it.",
    },
];