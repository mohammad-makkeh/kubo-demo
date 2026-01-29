import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export default function cn(...classes: Array<string | boolean | undefined | null>): string {
    return twMerge(clsx(...classes));
}
