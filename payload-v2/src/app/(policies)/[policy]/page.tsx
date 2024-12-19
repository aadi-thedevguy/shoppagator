import { getPolicyPage } from "@/lib/queries.server";
import React from "react";
import { serialize } from "@/components/serialise";
import { notFound } from "next/navigation";
import { Children } from "@/components/serialise";

async function Page({ params }: { params: { policy: string } }) {
  const data = await getPolicyPage(params.policy);

  if (!data) return notFound();

  return (
    <section className="border rounded-sm border-border my-6 mx-auto w-fit p-4 overflow-x-hidden">
      <h1 className="text-4xl mb-6 text-primary text-center font-bold tracking-tight sm:text-6xl">
        {params.policy === "cookie"
          ? "Cookie Policy"
          : params.policy === "tos"
          ? "Terms of Service"
          : "Privacy Policy"}
      </h1>
      {data &&
        data.length &&
        data.map((el, i) => (
          <article
            key={i}
            className="my-4 prose max-w-[75ch] prose-sky lg:prose-lg"
          >
            {serialize(el.children as Children)}
          </article>
        ))}
    </section>
  );
}

export default Page;
