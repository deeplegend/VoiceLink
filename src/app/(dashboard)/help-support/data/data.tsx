// src/data/faq-content.ts
import Link from "next/link";

export type FAQItem = {
    id: string;
    question: string;
    answer: string | React.ReactNode;
    youtubeId?: string;
};

export type FAQCategory = {
    title: string;
    items: FAQItem[];
};

export const faqData: FAQCategory[] = [
    {
        title: "Getting Started",
        items: [
            {
                id: "item-1",
                question: "What is VoiceLink?",
                answer: "VoiceLink converts written text into natural-sounding speech using Artificial Intelligence. Users can input text and generate audio using a variety of predefined voices provided by the system. Additionally, users can upload their own voice samples to create customized voice models that can generate new speech from text.",
            }
        ]
    },
    {
        title: "Text-to-Speech Generation",
        items: [
            {
                id: "item-2",
                question: "How do I create speech using text on VoiceLink?",
                answer: (
                    <>
                        To create speech using text on VoiceLink, simply enter your desired text into the input field on the {" "}
                        <Link 
                            href="/text-to-speech" 
                            className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
                        >
                            Text-to-Speech page
                        </Link>
                        . Once you click the 'Generate' button, the system will process your input and produce an audio output that you can listen to or download.
                    </>
                ),
                youtubeId: "Y6lHWYNv7sw"
            },
            {
                id: "item-10",
                question: "How do I make the generated voice sound more expressive or natural?",
                answer: (
                    <> You can fine-tune the AI's performance using the Advanced Settings in the {" "}
                    <Link 
                            href="/text-to-speech" 
                            className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
                        >
                            Text-to-Speech page
                        </Link> 
                        . Use the 'Creativity' slider to make the delivery more expressive, adjust 'Voice Variety' for dynamic pitch changes, tweak 'Expression Range' to add dramatic weight, and use 'Natural Flow' to control the pacing, from a steady, rhythmic cadence to a more varied, conversational delivery.
                    </>
                ),
            },
            {
                id: "item-11",
                question: "Is there a limit to how much text I can generate at once?",
                answer: "Yes, you can input up to 10,000 characters per single generation request. If you have a longer script, such as a full audiobook chapter, we recommend breaking it down into smaller paragraphs and generating them in separate batches for the best audio quality."
            }
        ]
    },
    {
        title: "Custom Voice Cloning",
        items: [
            {
                id: "item-3",
                question: "How do I clone my voice on VoiceLink?",
                answer: 
                <>
                "To clone your voice on VoiceLink, go to the {" "}
                <Link 
                            href="/text-to-speech" 
                            className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
                        >
                            Text-to-Speech page
                        </Link> tab and click 'Create Voice'. You can record directly from your microphone or upload a clean, high-quality audio file (WAV or MP3) of the voice you want to clone.",
                        </>,
                youtubeId: "oCi9ubELoz4"
            },
            {
                id: "item-4",
                question: "What makes a good audio sample for voice cloning?",
                answer: "A good audio sample for voice cloning should be a clean, high-quality recording of the voice you want to clone. It should be at least 10 seconds long and recorded in a quiet environment with minimal background noise.",
            },
            {
                id: "item-5",
                question: "Any limit on the file size or length of the audio sample for voice cloning?",
                answer: "Yes, there is a limit on the file size and length of the audio sample for voice cloning. The maximum file size allowed is 20MB, and the audio sample should be at least 10 seconds long to ensure good quality voice cloning results.",
            },
            {
                id: "item-6",
                question: "What should I say when recording my voice?",
                answer: "When recording your voice for cloning, try to say a variety of sentences that include different sounds and intonations. This will help the system better understand and replicate your unique speech patterns. If you are unsure what to say, click the 'Don't know what to say?' button for sample text.",
            }
        ]
    },
    {
        title: "Privacy & Commercial Rights",
        items: [
            {
                id: "item-7",
                question: "Are my voice recordings kept private and secure?",
                answer: "Yes, your voice recordings are kept private and secure. We implement industry-standard security measures to protect your data and ensure that your voice samples are not shared or used without your consent.",
            },
            {
                id: "item-13",
                question: "Who owns the rights to the audio I generate?",
                answer: "You do! You retain full ownership of any audio you generate using VoiceLink, including voices you have custom-cloned from your own original audio. You are free to use the downloaded .wav files for commercial projects, podcasts, YouTube videos, and more."
            }
        ]
    },
    {
        title: "Account & Troubleshooting",
        items: [
            {
                id: "item-8",
                question: "Where can I find my past generated audio files?",
                answer: (
                    <>
                        You can find your past generated audio files in the 'History' section of the{" "}
                        <Link 
                            href="/text-to-speech" 
                            className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
                        >
                            Text-to-Speech page
                        </Link>
                        . This section keeps a record of all the audio files you have generated, allowing you to listen to them again or download them at any time.
                    </>
                ),
            },
            {
                id: "item-9",
                question: "Can I download the generated audio to use in my own projects?",
                answer: "Yes, you can download the generated audio files to use in your own projects. After generating the speech from text, you will have the option to download the audio file in a .wav format.",
            },
            {
                id: "item-14",
                question: "How can I delete a custom voice I previously cloned?",
                answer: 
                <>
                "If you no longer need a custom voice, navigate to the '{" "}
                <Link 
                            href="/voices" 
                            className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
                        >
                            Explore Voices 
                </Link> 
                        ' tab in your dashboard. Find the voice you wish to remove, click the three dots (options) next to it, and select 'Delete'. This will permanently remove the voice model from our servers."
                </>
            },
            {
                id: "item-12",
                question: "Why is my microphone not working when I try to record my voice?",
                answer: "If the recorder isn't picking up your audio, your browser is likely blocking microphone access. Look for a small camera or microphone icon in your browser's URL address bar, click it, and ensure that VoiceLink is allowed to access your microphone. Then, refresh the page and try again."
            }
        ]
    },
    {
        title: "Issues?",
        items: [
            {
                id: "item-13",
                question: "What to do when not able to generate audio? / What if the site is loading but doing nothing?",
                answer:<> If you're experiencing issues with audio generation or the site is loading without responding, please try the following troubleshooting steps: <li>1) Refresh the page and try again.</li> <li>2) Clear your browser cache and cookies.</li> <li>3) Ensure you have a stable internet connection.</li> <li>4) Try using a different browser or device.</li> If the problem persists, please contact our support team using feedback form for further assistance.
                </>
            }
        ]
    },
];
