import { FC } from "react";
import * as d3 from "d3-format";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/Tooltip";
import { twMerge } from "tailwind-merge";
import { formatUnits } from "viem";

interface Props extends React.HTMLAttributes<HTMLSpanElement> {
  value: bigint | undefined;
  decimals?: number;
  tooltip?: boolean;
  prefix?: string;
  suffix?: string;
  displaySymbol?: boolean;
  discardLeadingZeroes?: boolean;
  tooltipChildren?: React.ReactNode;
}

export function formatAmount(value: bigint, decimals: number) {
  const numberValue = Number(formatUnits(value, decimals));
  let formattedAmount =
    numberValue < 1 ? numberValue.toFixed(2).toString() : d3.format(".3s")(numberValue);
  formattedAmount = formattedAmount.replace("G", "B");
  return formattedAmount;
}

export const Amount: FC<Props> = ({
  className,
  value,
  prefix = "",
  suffix = "",
  displaySymbol = true,
  decimals = 0,
  tooltip = true,
  discardLeadingZeroes = false,
  tooltipChildren,
  ...props
}) => {
  let formattedAmount = formatAmount(value || 0n, decimals);
  if (discardLeadingZeroes) {
    const lastChar = formattedAmount.slice(-1);
    const lastCharIsNumber = /[0-9]/.test(lastChar);
    if (!lastCharIsNumber) formattedAmount = formattedAmount.slice(0, -1);
    while (formattedAmount.endsWith("0")) formattedAmount = formattedAmount.slice(0, -1);
    if (formattedAmount.endsWith(".")) formattedAmount = formattedAmount.slice(0, -1);
    if (!lastCharIsNumber) formattedAmount += lastChar;
  }
  suffix = suffix !== "" && !suffix.startsWith(" ") ? " " + suffix : suffix;
  if (!tooltip)
    return (
      <span className={className} {...props}>
        {displaySymbol && prefix}
        {formattedAmount}
        {displaySymbol && suffix}
      </span>
    );
  else
    return (
      <Tooltip>
        <TooltipTrigger className={twMerge("cursor-help", className)}>
          {displaySymbol && prefix}
          {formattedAmount}
          {displaySymbol && suffix}
        </TooltipTrigger>
        <TooltipContent className="font-heading font-bold inline-flex flex-col justify-center items-center gap-2">
          <span>
            {prefix}
            {/* {Number(formatUnits(value || 0n, decimals))} */}
            {d3.format(",")(Number(formatUnits(value || 0n, decimals)))}
            {suffix}
          </span>
          {tooltipChildren}
        </TooltipContent>
      </Tooltip>
    );
};
