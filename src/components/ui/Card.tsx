"use client";
import React, { FC, useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";
import { Slot } from "@radix-ui/react-slot";

export const cardRadiuses = ["default", "full"] as const;
export type CardRadius = (typeof cardRadiuses)[number];

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  radius?: CardRadius;
  defaultGradient?: boolean;
  animated?: boolean;
  asChild?: boolean;
  circleSize?: number;
}

export const Card: FC<CardProps> = ({
  className,
  children,
  radius = "default",
  defaultGradient = false,
  animated = true,
  asChild = false,
  circleSize = 300,
  ...props
}) => {
  const Comp = asChild ? Slot : "article";
  const card = useRef<HTMLElement>();
  useEffect(() => {
    card.current?.style.setProperty("--circle-size", `${circleSize}px`);
  });
  return (
    <Comp
      //@ts-ignore
      ref={card}
      className={twMerge(
        animated && "card", // Used by <CardsHelper />
        defaultGradient ? "bg-card-border-default" : "bg-card-border",
        "relative shadow-[0px_4px_12px_rgba(0,0,0,0.05)] p-[2px]",
        "before:absolute before:inset-[2px] before:-z-1",
        defaultGradient ? "before:bg-card-content-default" : "before:bg-card-content",

        // Radiuses
        {
          default: "rounded-[1.8rem] before:rounded-[1.7rem]",
          full: "rounded-full before:rounded-full",
        }[radius],
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
};
