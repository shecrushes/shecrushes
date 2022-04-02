## SheCrushes Adult Website

Simple, open-source and privacy-friendly porn site.

## About this project

This project was created to be a learning experience. I wanted to create a site that would be used by a large amount of users, so I could get actual experience with working on real world application. I also disliked the large amount of spam and badly integrated advertisements that I saw on many of these sites.

## Tech used

Frontend:

- NextJS (framework)
- TailwindCSS (styling)
- Firebase (user accounts)
- TypeScript

Backend:

- Fastify (web framework)
- Redis (Cache for categories)
- PostgresSQL (database to store videos)
- Firebase (user accounts)
- TypeScript

## How does the site work?

_Note: To get the site up and running on your machine, follow the steps in each respective folders README_.

The idea for this site was to be able to view videos in an infinite scroll type format. There is a different layout for desktop and for mobile. On desktop, videos are formatted in a Masonry style layout, on mobile they are formatted in an infinite scroll format (like tiktok or Instagram reels).

I'll only be covering the backend as nothing much interesting happens in the frontend.

Let's start. First, all videos are scraped from redgifs.com. This project only scrapes and stores links, this is important to note. The backend of this project is pretty much one big web scraper, every hour, videos are scraped from some pre-specified categories. When videos are scraped, they are first stored in a Redis database. Then they are cached on the server and expire every hour. Then, each individual video is stored in postgres. It's important to store the links scraped in case a user wants to come back to the video later.

This is an over-simplified summary of what's going on. More details in the README inside the server folder.
