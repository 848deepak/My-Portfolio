"use client";
import React, { useRef, useLayoutEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Button({
  borderRadius = "1.75rem",
  children,
  as: Component = "button",
  containerClassName,
  borderClassName,
  duration = 3000,
  className,
  ...otherProps
}: {
  borderRadius?: string;
  children: React.ReactNode;
  as?: any;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
  className?: string;
  [key: string]: any;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (ref.current) {
      const { width, height } = ref.current.getBoundingClientRect();
      setSize({ width, height });
    }
  }, [children]);

  return (
    <Component
      ref={ref}
      className={cn(
        "relative overflow-visible bg-transparent text-xl",
        containerClassName,
      )}
      style={{
        borderRadius: borderRadius,
        minWidth: '8rem',
        minHeight: '3.5rem',
      }}
      {...otherProps}
    >
      <MovingBorder
        duration={duration}
        width={size.width}
        height={size.height}
        borderRadius={borderRadius}
      />
      <div
        className={cn(
          "relative flex h-full w-full items-center justify-center border border-slate-800 bg-slate-900/[0.8] text-sm text-white antialiased backdrop-blur-xl",
          className,
        )}
        style={{
          borderRadius: `calc(${borderRadius} * 0.96)`,
        }}
      >
        {children}
      </div>
    </Component>
  );
}

export const MovingBorder = ({
  duration = 2000,
  width = 160,
  height = 56,
  borderRadius = "1.75rem",
}: {
  duration?: number;
  width?: number;
  height?: number;
  borderRadius?: string;
}) => {
  // Calculate rx/ry from borderRadius and height
  let rx = 0;
  let ry = 0;
  if (typeof borderRadius === 'string' && borderRadius.endsWith('rem')) {
    const val = parseFloat(borderRadius) * 16;
    rx = val;
    ry = val;
  } else if (typeof borderRadius === 'number') {
    rx = borderRadius;
    ry = borderRadius;
  } else {
    rx = 28;
    ry = 28;
  }
  return (
    <motion.svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}
    >
      <motion.rect
        x={1.5}
        y={1.5}
        width={width - 3}
        height={height - 3}
        rx={rx}
        ry={ry}
        stroke="transparent"
        strokeWidth={3}
        fill="none"
        initial={{ filter: "drop-shadow(0 0 8px #0ea5e9)" }}
        animate={{ filter: [
          "drop-shadow(0 0 8px #0ea5e9)",
          "drop-shadow(0 0 16px #38bdf8)",
          "drop-shadow(0 0 8px #0ea5e9)"
        ] }}
        transition={{ duration: duration / 1000, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.svg>
  );
}; 