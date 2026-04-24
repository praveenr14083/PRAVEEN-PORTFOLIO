"use client";
import React from "react";
import { motion } from "motion/react";

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
      <div className="relative flex flex-col items-center gap-8">
        {/* Animated Rings */}
        <div className="relative size-24">
          <motion.div
            className="absolute inset-0 rounded-full border-t-2 border-primary-color"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-2 rounded-full border-r-2 border-primary-color/50"
            animate={{ rotate: -360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-4 rounded-full border-b-2 border-primary-color/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Text Animation */}
        <div className="flex flex-col items-center">
          <motion.h1
            className="text-2xl font-doto font-bold tracking-widest text-foreground"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            PRAVEEN
          </motion.h1>
          <motion.div
            className="h-0.5 w-0 bg-primary-color"
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <p className="mt-2 text-xs uppercase tracking-widest text-muted-foreground animate-pulse">
            Loading Portfolio
          </p>
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-color/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary-color/5 rounded-full blur-[120px]" />
      </div>
    </div>
  );
}
