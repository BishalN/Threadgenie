import * as React from "react";
import { Check, Copy } from "lucide-react";

interface CopyButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  value: string;
}

async function copyToClipboard(value: string) {
  navigator.clipboard.writeText(value);
}

export function CopyButton({ value, className, ...props }: CopyButtonProps) {
  const [hasCopied, setHasCopied] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  }, [hasCopied]);

  return (
    <button
      className="relative z-20 inline-flex h-8 items-center justify-center rounded-md border-slate-200 p-2 text-sm font-medium text-slate-900 transition-all hover:bg-slate-100 focus:outline-none dark:text-slate-100 dark:hover:bg-slate-800"
      onClick={() => {
        copyToClipboard(value);
        setHasCopied(true);
      }}
      {...props}
    >
      <span className="sr-only">Copy</span>
      {hasCopied ? (
        <Check className="h-4 w-4 " />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </button>
  );
}
