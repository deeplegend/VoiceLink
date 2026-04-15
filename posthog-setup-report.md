<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into VoiceLink — an AI-powered text-to-speech Next.js App Router application.

## Summary of changes

### Infrastructure
- **`instrumentation-client.ts`** (new) — Initializes `posthog-js` for client-side tracking using the Next.js 15.3+ `instrumentation-client` pattern. Routes events through a `/ingest` reverse proxy to avoid ad-blockers.
- **`next.config.ts`** — Added `/ingest` reverse proxy rewrites for PostHog ingestion and set `skipTrailingSlashRedirect: true`.
- **`src/lib/posthog-server.ts`** (new) — Singleton `posthog-node` client for server-side event capture in API routes and tRPC procedures.
- **`src/components/posthog-user-identify.tsx`** (new) — Client component that calls `posthog.identify()` with Clerk user data (ID, email, name) on mount and `posthog.reset()` on sign-out.
- **`src/app/layout.tsx`** — Mounts `PostHogUserIdentify` so user identity is established for every page.
- **`.env.local`** — Populated `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST`.

### Event tracking

| Event | Description | File |
|---|---|---|
| `speech_generation_submitted` | User submitted the TTS form to generate audio | `src/features/text-to-speech/components/text-to-speech-form.tsx` |
| `speech_generation_completed` | Audio generated successfully (client-side confirmation) | `src/features/text-to-speech/components/text-to-speech-form.tsx` |
| `speech_generation_failed` | Audio generation failed with error capture | `src/features/text-to-speech/components/text-to-speech-form.tsx` |
| `voice_creation_submitted` | User submitted the custom voice creation form | `src/features/voices/components/voice-create-form.tsx` |
| `voice_creation_completed` | Custom voice created successfully | `src/features/voices/components/voice-create-form.tsx` |
| `voice_creation_failed` | Custom voice creation failed with error capture | `src/features/voices/components/voice-create-form.tsx` |
| `voice_selected` | User changed the selected voice in the TTS selector | `src/features/text-to-speech/components/voice-selector.tsx` |
| `prompt_suggestion_selected` | User clicked a prompt suggestion badge | `src/features/text-to-speech/components/prompt-suggestions.tsx` |
| `speech_generated` | **Server-side:** audio generated and persisted in R2 | `src/trpc/routers/generations.ts` |
| `voice_created` | **Server-side:** custom voice uploaded and stored | `src/app/api/voices/create/route.ts` |

## Next steps

We've built a dashboard and five insights to monitor user behavior based on the events above:

- **Dashboard — Analytics basics:** https://us.posthog.com/project/383502/dashboard/1471933
- **Speech Generation Funnel** (submitted → completed conversion): https://us.posthog.com/project/383502/insights/izx0PGYW
- **Speech Generation Volume (Daily)** (submitted vs. completed trend): https://us.posthog.com/project/383502/insights/VhOXRzdh
- **Voice Creation Funnel** (submitted → completed conversion): https://us.posthog.com/project/383502/insights/KmwulXcK
- **Top Prompt Suggestions Used** (breakdown by suggestion label): https://us.posthog.com/project/383502/insights/9Uq7iFCQ
- **Speech Generation Error Rate** (failed vs. submitted over time): https://us.posthog.com/project/383502/insights/pUnuBpNu

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
