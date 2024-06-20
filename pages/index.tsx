import React from "react";
import { Link, Snippet, Code, button as buttonStyles } from "@nextui-org/react";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/common/primitives";
import { GithubIcon } from "@/components/common/icons";
import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>A&nbsp;</h1>
          <h1 className={title({ color: "violet" })}>MQTT&nbsp;</h1>
          <br />
          <h1 className={title()}>dashboard</h1>
          <h4 className={subtitle({ class: "mt-4" })}>
            Fast and reactive dashboard for IoT devices
          </h4>
        </div>

        <div className="flex gap-3">
          <Link
            isExternal
            className={buttonStyles({
              color: "primary",
              radius: "full",
              variant: "shadow",
            })}
            href={siteConfig.links.docs}
          >
            Documentation
          </Link>
          <Link
            isExternal
            className={buttonStyles({ variant: "bordered", radius: "full" })}
            href={siteConfig.links.github}
          >
            <GithubIcon size={20} />
            GitHub
          </Link>
        </div>

        <div className="mt-8">
          <Snippet hideCopyButton hideSymbol variant="bordered">
            <span>
              Add your devices in <Code color="primary">config/items.json</Code>
            </span>
          </Snippet>
        </div>
      </section>
    </DefaultLayout>
  );
}
