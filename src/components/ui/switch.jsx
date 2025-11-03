"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

function Switch({ className, ...props }) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer inline-flex h-14 w-24 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none data-[state=unchecked]:bg-input data-[state=checked]:bg-[var(--active-color)] focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block size-12 rounded-full transition-transform data-[state=unchecked]:translate-x-1 data-[state=checked]:translate-x-10.5 bg-background"
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
