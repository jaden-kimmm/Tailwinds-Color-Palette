"use client";

import "./globals.css";
import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Search, ArrowUp, Check, Plus, X } from "lucide-react";

const NAMES = [
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
  "slate",
  "gray",
  "zinc",
  "neutral",
  "stone",
];

const TAILWIND_COLORS = {
  red: {
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    300: "#fca5a5",
    400: "#f87171",
    500: "#ef4444",
    600: "#dc2626",
    700: "#b91c1c",
    800: "#991b1b",
    900: "#7f1d1d",
    950: "#450a0a",
  },
  orange: {
    50: "#fff7ed",
    100: "#ffedd5",
    200: "#fed7aa",
    300: "#fdba74",
    400: "#fb923c",
    500: "#f97316",
    600: "#ea580c",
    700: "#c2410c",
    800: "#9a3412",
    900: "#7c2d12",
    950: "#431407",
  },
  amber: {
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#f59e0b",
    600: "#d97706",
    700: "#b45309",
    800: "#92400e",
    900: "#78350f",
    950: "#451a03",
  },
  yellow: {
    50: "#fefce8",
    100: "#fef9c3",
    200: "#fef08a",
    300: "#fde047",
    400: "#facc15",
    500: "#eab308",
    600: "#ca8a04",
    700: "#a16207",
    800: "#854d0e",
    900: "#713f12",
    950: "#422006",
  },
  lime: {
    50: "#f7fee7",
    100: "#ecfccb",
    200: "#d9f99d",
    300: "#bef264",
    400: "#a3e635",
    500: "#84cc16",
    600: "#65a30d",
    700: "#4d7c0f",
    800: "#365314",
    900: "#1a2e05",
    950: "#0f2003",
  },
  green: {
    50: "#f0fdf4",
    100: "#dcfce7",
    200: "#bbf7d0",
    300: "#86efac",
    400: "#4ade80",
    500: "#22c55e",
    600: "#16a34a",
    700: "#15803d",
    800: "#166534",
    900: "#14532d",
    950: "#052e16",
  },
  emerald: {
    50: "#ecfdf5",
    100: "#d1fae5",
    200: "#a7f3d0",
    300: "#6ee7b7",
    400: "#34d399",
    500: "#10b981",
    600: "#059669",
    700: "#047857",
    800: "#065f46",
    900: "#064e3b",
    950: "#022c22",
  },
  teal: {
    50: "#f0fdfa",
    100: "#ccfbf1",
    200: "#99f6e4",
    300: "#5eead4",
    400: "#2dd4bf",
    500: "#14b8a6",
    600: "#0d9488",
    700: "#0f766e",
    800: "#115e59",
    900: "#134e4a",
    950: "#042f2e",
  },
  cyan: {
    50: "#ecfeff",
    100: "#cffafe",
    200: "#a5f3fc",
    300: "#67e8f9",
    400: "#22d3ee",
    500: "#06b6d4",
    600: "#0891b2",
    700: "#0e7490",
    800: "#155e75",
    900: "#164e63",
    950: "#083344",
  },
  sky: {
    50: "#f0f9ff",
    100: "#e0f2fe",
    200: "#bae6fd",
    300: "#7dd3fc",
    400: "#38bdf8",
    500: "#0ea5e9",
    600: "#0284c7",
    700: "#0369a1",
    800: "#075985",
    900: "#0c4a6e",
    950: "#082f49",
  },
  blue: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
    950: "#172554",
  },
  indigo: {
    50: "#eef2ff",
    100: "#e0e7ff",
    200: "#c7d2fe",
    300: "#a5b4fc",
    400: "#818cf8",
    500: "#6366f1",
    600: "#4f46e5",
    700: "#4338ca",
    800: "#3730a3",
    900: "#312e81",
    950: "#1e1b4b",
  },
  violet: {
    50: "#f5f3ff",
    100: "#ede9fe",
    200: "#ddd6fe",
    300: "#c4b5fd",
    400: "#a78bfa",
    500: "#8b5cf6",
    600: "#7c3aed",
    700: "#6d28d9",
    800: "#5b21b6",
    900: "#4c1d95",
    950: "#2e1065",
  },
  purple: {
    50: "#faf5ff",
    100: "#f3e8ff",
    200: "#e9d5ff",
    300: "#d8b4fe",
    400: "#c084fc",
    500: "#a855f7",
    600: "#9333ea",
    700: "#7e22ce",
    800: "#6b21a8",
    900: "#581c87",
    950: "#3b0764",
  },
  fuchsia: {
    50: "#fdf4ff",
    100: "#fae8ff",
    200: "#f5d0fe",
    300: "#f0abfc",
    400: "#e879f9",
    500: "#d946ef",
    600: "#c026d3",
    700: "#a21caf",
    800: "#86198f",
    900: "#701a75",
    950: "#4a044e",
  },
  pink: {
    50: "#fdf2f8",
    100: "#fce7f3",
    200: "#fbcfe8",
    300: "#f9a8d4",
    400: "#f472b6",
    500: "#ec4899",
    600: "#db2777",
    700: "#be185d",
    800: "#9f1239",
    900: "#831843",
    950: "#500724",
  },
  rose: {
    50: "#fff1f2",
    100: "#ffe4e6",
    200: "#fecdd3",
    300: "#fda4af",
    400: "#fb7185",
    500: "#f43f5e",
    600: "#e11d48",
    700: "#be123c",
    800: "#9f1239",
    900: "#881337",
    950: "#4c0519",
  },
  slate: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
    950: "#020617",
  },
  gray: {
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827",
    950: "#030712",
  },
  zinc: {
    50: "#fafafa",
    100: "#f4f4f5",
    200: "#e4e4e7",
    300: "#d4d4d8",
    400: "#a1a1aa",
    500: "#71717a",
    600: "#52525b",
    700: "#3f3f46",
    800: "#27272a",
    900: "#18181b",
    950: "#09090b",
  },
  neutral: {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#e5e5e5",
    300: "#d4d4d4",
    400: "#a3a3a3",
    500: "#737373",
    600: "#525252",
    700: "#404040",
    800: "#262626",
    900: "#171717",
    950: "#0a0a0a",
  },
  stone: {
    50: "#fafaf9",
    100: "#f5f5f4",
    200: "#e7e5e4",
    300: "#d6d3d1",
    400: "#a8a29e",
    500: "#78716c",
    600: "#57534e",
    700: "#44403c",
    800: "#292524",
    900: "#1c1917",
    950: "#0c0a09",
  },
};

const COLORS = NAMES.map((name) => ({
  name: name[0].toUpperCase() + name.slice(1),
  swatch: `bg-${name}-600`,
}));

function App() {
  const [selectedColor, setSelectedColor] = useState(null);
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile message - only shows below lg */}
      <div className="flex min-h-screen items-center justify-center p-8 lg:hidden">
        <div className="text-center">
          <h1 className="font-sans text-xs font-normal text-black">
            Desktop view only
          </h1>
          <h2 className="font-sans text-xs font-normal text-black/50">
            Please view this project on a desktop or tablet.
          </h2>
          <h2 className="font-sans text-xs font-normal text-black/50">
            Mobile view coming soon.
          </h2>
        </div>
      </div>

      {/* Main content - hidden below sm, shows on sm and up */}
      <div className="hidden lg:block">
        <header className="flex w-full items-center justify-between px-8 pt-8">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl bg-white">
            <div className="h-4 w-4 animate-[rainbow_20s_linear_infinite] rounded-2xl" />
          </div>
          <h1 className="font-sans text-sm text-black/50">
            Tailwind's Color Palette
          </h1>
          <a
            href="https://x.com/jadenkdesign"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-sm text-black hover:underline"
          >
            Jaden Kim
          </a>
        </header>

        <div className="grid grid-cols-1 gap-4 p-8 sm:grid-cols-2 lg:grid-cols-4">
          {COLORS.map((color) => (
            <ColorCard
              key={color.name}
              name={color.name}
              swatch={color.swatch}
              onOpen={() => setSelectedColor(color.name)}
            />
          ))}
        </div>

        {selectedColor && (
          <Modal color={selectedColor} onClose={() => setSelectedColor(null)} />
        )}
      </div>
    </div>
  );
}

function ColorCard({ name, swatch, onOpen }) {
  return (
    <div className="flex h-full flex-col gap-4 rounded-2xl border border-stone-200 bg-white p-4">
      <div className={`h-36 w-full rounded-xl ${swatch}`} />
      <div className="flex justify-between">
        <div>
          <h1 className="font-sans text-xs font-normal text-black/50">
            {swatch}
          </h1>
          <h2 className="font-sans text-xs font-normal text-black">{name}</h2>
        </div>
        <button
          className="bg-gray-custom rounded-3xl px-5 py-2 font-sans text-xs text-black/50 duration-100 ease-in hover:bg-gray-200"
          onClick={onOpen}
        >
          Swatches
        </button>
      </div>
    </div>
  );
}

function Modal({ color, onClose }) {
  const [activeShade, setActiveShade] = useState(600);
  const [textareaValue, setTextareaValue] = useState("");
  const SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
  const colorKey = color.toLowerCase();
  const activeColorHex =
    TAILWIND_COLORS[colorKey]?.[activeShade] || TAILWIND_COLORS.blue[600];

  // Disable body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 bg-black/80">
      <div
        className="mx-auto mt-16 flex h-[calc(100vh-4rem)] bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex h-full flex-col w-64 border border-slate-200 bg-neutral-50 p-8">
          <div className="mb-6">
            <h1 className="font-sans text-xs font-normal text-black/50">
              Palette
            </h1>
            <h2 className="font-sans text-xs font-normal text-black">
              {color}
            </h2>
          </div>
          {SHADES.map((shade) => {
            const swatchClass = `bg-${colorKey}-${shade}`;

            return (
              <div
                key={shade}
                onClick={() => setActiveShade(shade)}
                className="flex cursor-pointer items-center justify-between py-1 hover:bg-gray-100 rounded px-2 transition-colors"
              >
                <span className="text-xs text-black">
                  {colorKey}-{shade}
                </span>
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl bg-white">
                  <div className={`h-4 w-4 rounded-2xl ${swatchClass}`} />
                </div>
              </div>
            );
          })}
          <a
            href="https://tailwindcss.com/docs/colors"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-normal text-black/50 mt-auto hover:underline"
          >
            Tailwind Docs
          </a>
        </div>

        <div className="flex flex-1 flex-col bg-gray-100 p-8">
          <div className="mb-6 flex justify-end">
            <button
              onClick={onClose}
              className="rounded-full p-2 hover:bg-gray-200 transition-colors"
              aria-label="Close"
            >
              <X className="size-4" />
            </button>
          </div>
          <div className="grid h-full grid-cols-3 grid-rows-[1fr_2fr] gap-4">
            {/* top row */}
            <div
              className="rounded-2xl bg-white flex items-center justify-center p-6"
              style={{
                "--active-color": activeColorHex,
              }}
            >
              <div className="flex items-start gap-3 rounded-lg border p-3 w-full has-[[aria-checked=true]]:border-[var(--active-color)] has-[[aria-checked=true]]:bg-[var(--active-color)]/10">
                <Checkbox id="terms" />
                <div className="grid gap-2">
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none cursor-pointer"
                  >
                    Accept terms and conditions
                  </label>
                  <p className="text-sm text-muted-foreground">
                    By clicking this checkbox, you agree using Tailwind for this
                    project.
                  </p>
                </div>
              </div>
            </div>
            <div
              className="rounded-2xl bg-white flex items-center justify-center"
              style={{
                "--active-color": activeColorHex,
              }}
            >
              <Switch />
            </div>
            <div
              className="rounded-2xl bg-white flex items-center justify-center"
              style={{
                "--active-color": activeColorHex,
              }}
            >
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-[var(--active-color)] bg-[var(--active-color)]/10"
                  >
                    Use Tailwind
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently use
                      Tailwind for this project and remove all custom CSS.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-[var(--active-color)] hover:bg-[var(--active-color)]/90 text-white"
                      style={{
                        "--active-color": activeColorHex,
                      }}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>

            {/* bottom row */}
            <div
              className="col-span-2 rounded-2xl bg-white flex items-center justify-center p-6"
              style={{
                "--active-color": activeColorHex,
              }}
            >
              <div className="grid w-full max-w-md gap-6">
                <InputGroup className="border-[var(--active-color)] bg-[var(--active-color)]/10">
                  <InputGroupTextarea
                    placeholder="Search Tailwind Documentation..."
                    value={textareaValue}
                    onChange={(e) => setTextareaValue(e.target.value)}
                  />
                  <InputGroupAddon align="block-end">
                    <InputGroupButton
                      variant="outline"
                      className="rounded-full bg-[var(--active-color)] hover:bg-[var(--active-color)]/90 text-white border-[var(--active-color)]"
                      size="icon-xs"
                    >
                      <Plus />
                    </InputGroupButton>
                    <InputGroupText className="ml-auto">v4.1</InputGroupText>
                    <InputGroupButton
                      variant="default"
                      className="rounded-full bg-[var(--active-color)] hover:bg-[var(--active-color)]/90 text-white disabled:opacity-50"
                      size="icon-xs"
                      disabled={!textareaValue.trim()}
                    >
                      <ArrowUp />
                      <span className="sr-only">Send</span>
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
              </div>
            </div>
            <div
              className="rounded-2xl bg-white flex items-center justify-center p-6"
              style={{
                "--active-color": activeColorHex,
              }}
            >
              <ScrollArea className="h-72 w-full rounded-md border border-[var(--active-color)] bg-[var(--active-color)]/10">
                <div className="p-4">
                  <h4 className="mb-4 text-sm leading-none font-medium">
                    Colors
                  </h4>
                  {NAMES.map((color, index) => (
                    <>
                      <div key={color} className="text-sm capitalize">
                        {color}
                      </div>
                      {index < NAMES.length - 1 && (
                        <div
                          key={`separator-${color}`}
                          className="my-2 h-px bg-border"
                        />
                      )}
                    </>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
