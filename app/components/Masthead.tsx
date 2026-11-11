import { Band } from "@metateic/ui"

export function Masthead({ title, lede }: { title: string; lede?: string }) {
  return (
    <Band tone="navy">
      <h1 className="max-w-3xl text-4xl leading-[1.05] font-semibold tracking-[-0.03em] text-balance md:text-6xl">
        {title}
      </h1>
      {lede ? <p className="mt-5 max-w-xl text-lg leading-8 text-pretty text-white/80">{lede}</p> : null}
    </Band>
  )
}
