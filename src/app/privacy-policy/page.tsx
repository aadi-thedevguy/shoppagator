import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { getPolicyPage } from "@/lib/actions.server";
import React from "react";
import { serialize } from "@/components/serialise";

async function Privacy() {
  const data = await getPolicyPage("privacy-policy");
  return (
    <MaxWidthWrapper className>
      {data &&
        data.length &&
        data.map((el, i) => (
          <article key={i} className="my-4 prose-sky lg:prose-xl">
            {serialize(el.children)}
          </article>
        ))}
    </MaxWidthWrapper>
  );
}

export default Privacy;
