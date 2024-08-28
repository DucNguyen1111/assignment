# Monorepo Boilerplate

An opinionated production-ready monorepo frontend boilerplate built on top of
NextJS, shipped with TypeScript, SWR, TailwindCSS, And Design, next-intl, Redux Toolkit. This project uses
[`monorepo`](https://nx.dev/nx-api/next/documents/overview).

## Quick Start

- Copy `.env.example` to `.env`

```shell script Linux
cp .env.example .env
```

Build project using nx:

```bash
npx nx build client
```

You can serve a Next.js application client for development:

```bash
npx nx dev client
```

To serve a Next.js application for production:

```bash
nx start my-new-app
```

Make sure to refer to the available scripts in `package.json`.

## App Overview

| App  | Dev Deployment                                | Local Dev Port |
| ---- | --------------------------------------------- | -------------- |
| next | https://nx.dev/nx-api/next/documents/overview | 3000           |

## Structure

```
├── public
│   ├── favicon.ico
│   ├── images
│   │   └── logo.png
│   ├── robots.txt
│   ├── sitemap.xml
│   └── svg
│       ├── checked-circle.svg
│       ├── close.svg
│       ├── error-warning.svg
│       └── Vercel.svg
├── specs
│   └── index.spec.tsx
├── src
│   ├── app
│   │   ├── en
│   │   │   ├── list-image
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── global.css
│   │   ├── layout.tsx
│   │   ├── not-found
│   │   │   └── page.tsx
│   │   ├── page.module.css
│   │   └── page.tsx
│   ├── i18n.ts
│   ├── libs
│   │   ├── common
│   │   │   ├── auth
│   │   │   │   └── index.tsx
│   │   │   └── hooks
│   │   │       ├── useFetch.tsx
│   │   │       └── useMutation.tsx
│   │   ├── shared
│   │   │   ├── constants
│   │   │   │   └── common.ts
│   │   │   ├── contexts
│   │   │   │   ├── LoadingContext.tsx
│   │   │   │   └── ScreenDetectionContext.tsx
│   │   │   ├── helpers
│   │   │   │   ├── common.ts
│   │   │   │   └── storage.ts
│   │   │   ├── lib
│   │   │   │   ├── clsxm.ts
│   │   │   │   ├── faetures
│   │   │   │   │   └── userDetail.ts
│   │   │   │   └── store.ts
│   │   │   ├── locales
│   │   │   │   └── common
│   │   │   │       └── en.json
│   │   │   ├── plugins
│   │   │   │   ├── antd.tsx
│   │   │   │   └── toast.tsx
│   │   │   ├── services
│   │   │   │   ├── index.ts
│   │   │   │   ├── type
│   │   │   │   │   └── exercise.ts
│   │   │   │   └── type.ts
│   │   │   ├── styles
│   │   │   │   ├── custom-antd.css
│   │   │   │   └── globals.css
│   │   │   └── utils
│   │   │       └── constant.ts
│   │   └── ui
│   │       ├── common
│   │       │   └── Toast.tsx
│   │       ├── form
│   │       │   ├── ErrorMessage.tsx
│   │       │   └── InputText.tsx
│   │       ├── layout
│   │       │   ├── Header.tsx
│   │       │   └── Layout.tsx
│   │       ├── links
│   │       │   ├── IconLink.tsx
│   │       │   ├── PrimaryLink.tsx
│   │       │   ├── UnderlineLink.tsx
│   │       │   └── UnstyledLink.tsx
│   │       └── pages
│   │           ├── ImportImagePage.tsx
│   │           └── ListImagePage.tsx
│   └── middleware.ts
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.spec.json
├── Dockerfile
├── env.example
├── index.d.ts
├── jest.config.ts
├── next.config.js
├── next-env.d.ts
├── postcss.config.js
├── project.json
└── README.md

```