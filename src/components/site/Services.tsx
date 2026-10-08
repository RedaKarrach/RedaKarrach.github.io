"use client";

import { useApp } from "@/lib/providers";
import { Icon, type IconName } from "./Icon";
import { Portrait } from "./Portrait";
import { Section } from "./Section";

const icons: IconName[] = ["radar", "bug", "code", "network"];

function Card({
  item,
  align,
}: {
  item: { title: string; text: string; icon: IconName };
  align: "left" | "right";
}) {
  return (
    <li
      className={`card flex gap-4 p-5 sm:p-6 ${align === "right" ? "lg:flex-row-reverse lg:text-right" : ""}`}
    >
      <span className="bg-accent-soft text-accent grid h-12 w-12 shrink-0 place-items-center rounded-full">
        <Icon name={item.icon} className="h-6 w-6" />
      </span>
      <div>
        <h3 className="text-lg font-semibold">{item.title}</h3>
        <p className="text-muted mt-1.5 text-[15px] leading-relaxed">{item.text}</p>
      </div>
    </li>
  );
}

export function Services() {
  const { t } = useApp();
  const items = t.services.items.map((item, i) => ({ ...item, icon: icons[i] }));

  return (
    <Section
      id="services"
      kicker={t.services.kicker}
      title={t.services.title}
      sub={t.services.sub}
      centered
    >
      <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-10">
        <ul className="grid gap-6">
          <Card item={items[0]} align="right" />
          <Card item={items[1]} align="right" />
        </ul>
        <div className="order-first mx-auto w-[200px] sm:w-[240px] lg:order-none lg:w-[260px]">
          <Portrait size={260} />
        </div>
        <ul className="grid gap-6">
          <Card item={items[2]} align="left" />
          <Card item={items[3]} align="left" />
        </ul>
      </div>
    </Section>
  );
}
