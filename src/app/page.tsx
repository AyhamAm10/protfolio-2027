import { Suspense } from "react";
import { getContent } from "@/content";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Hero } from "@/components/hero/Hero";
import { WhatIBuild } from "@/components/build/WhatIBuild";
import { SelectedWork } from "@/components/case-study/SelectedWork";
import { MoreWork } from "@/components/more-work/MoreWork";
import { Philosophy } from "@/components/philosophy/Philosophy";
import { Experience } from "@/components/experience/Experience";
import { Lab } from "@/components/lab/Lab";
import { Stack } from "@/components/stack/Stack";
import { Contact, SiteFooter } from "@/components/contact/Contact";

function personSchema(content: ReturnType<typeof getContent>) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ayham Ashram",
    jobTitle: "Full-stack engineer",
    url: content.meta.url,
    description: content.meta.description,
    sameAs: content.contact.links.filter((l) => !l.href.includes("ayhamashram.me")).map((l) => l.href),
  };
}

export default function Home() {
  const content = getContent();

  return (
    <>
      <SiteHeader nav={content.nav} />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema(content)) }}
      />
      <main id="main">
        <span id="top" aria-hidden="true" />
        <Hero content={content.hero} />
        <Suspense><WhatIBuild content={content.build} /></Suspense>
        <Suspense><SelectedWork content={content.work} /></Suspense>
        <Suspense><MoreWork content={content.moreWork} /></Suspense>
        <Suspense><Philosophy content={content.philosophy} /></Suspense>
        <Suspense><Experience content={content.experience} /></Suspense>
        <Suspense><Lab content={content.lab} /></Suspense>
        <Suspense><Stack content={content.stack} /></Suspense>
        <Suspense><Contact content={content.contact} /></Suspense>
      </main>
      <SiteFooter footer={content.contact.footer} />
    </>
  );
}
