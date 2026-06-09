# cheevo organizer

The cheevo organizer app — an on-site companion for event organizers to scan tickets, check in attendees, send broadcasts, and keep an eye on event activity from their phone.

It pairs with the cheevo platform: organizers create and manage events on the web panel ([cheevo.vip](https://cheevo.vip)), and use this app at the door. Attendees use the separate cheevo app.

## Stack

- Expo SDK 55 + Expo Router (typed routes)
- React 19 / React Native
- uniwind (Tailwind for React Native) + React Native Reusables
- TanStack Query, Zustand, React Hook Form + Zod
- Email-OTP auth (Sanctum tokens), Expo push notifications
- Sentry crash reporting

## Getting started

```bash
npm install
cp .env.example .env   # then fill in the values below
npm run dev
```

## Environment

| Variable | Description |
| --- | --- |
| `EXPO_PUBLIC_API_URL` | Base URL of the cheevo API (e.g. `https://api.cheevo.vip`) |
| `EXPO_PUBLIC_WEB_URL` | Base URL of the cheevo web (e.g. `https://cheevo.events`) |
| `EXPO_PUBLIC_SENTRY_DSN` | Sentry DSN for crash reporting (leave blank to disable) |

For production builds, these are set in `eas.json` per build profile.

## Building

Production builds run on EAS:

```bash
eas build --profile production --platform ios
eas submit --profile production --platform ios
```

The app is iOS-first (iPhone only). Native projects are generated via CNG, so `android/` and `ios/` are gitignored and regenerated on build.
