import { Layers } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex size-8 items-center justify-center rounded-md bg-violet-500 text-white">
        <Layers className="size-5" />
      </div>
      <span className="text-base font-semibold tracking-tight">DevStash</span>
    </div>
  );
}
