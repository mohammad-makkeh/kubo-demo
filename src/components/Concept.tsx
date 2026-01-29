import cn from "../utils/cn";

export interface ConceptProps {
  isBottleHorizontal: boolean;
}

export default function Concept({ isBottleHorizontal }: ConceptProps) {
  return (
    <section className={cn(
      "relative z-0 text-display-sm flex items-center justify-center p-3 opacity-0",
      isBottleHorizontal && 'opacity-100'
    )}>
      <h1 className="font-display text-display-md text-kobo-white">The Concept</h1>
    </section>
  );
}
