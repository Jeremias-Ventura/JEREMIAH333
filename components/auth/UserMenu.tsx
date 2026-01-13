"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, LayoutDashboard, LogOut, Loader2, Clock } from "lucide-react";
import { createClient } from '@/lib/supabase/client';
import type { User } from "@supabase/supabase-js";

interface UserMenuProps {
  user: User;
}

export function UserMenu({ user }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    // Keep menu open to show loading state
    
    const supabase = createClient();
    const startTime = Date.now();
    
    // Sign out
    const { error } = await supabase.auth.signOut();
    
    if (!error) {
      // Ensure minimum delay of 800ms for better UX (feels more natural)
      const elapsed = Date.now() - startTime;
      const minDelay = 800;
      const remainingDelay = Math.max(0, minDelay - elapsed);
      
      await new Promise(resolve => setTimeout(resolve, remainingDelay));
      
      // Close menu and navigate
      setIsOpen(false);
      router.refresh();
      router.push('/');
    } else {
      setIsSigningOut(false);
      console.error('Error signing out:', error);
    }
  };

  const userInitial = user.email?.[0].toUpperCase() || "U";

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-slate-900/10 border border-slate-800/50 hover:border-slate-700/50 transition-all duration-200 group"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center text-sm font-medium text-white shadow-sm cursor-pointer">
          {userInitial}
        </div>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 transition-transform duration-200 cursor-pointer ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-56 bg-slate-900/95 backdrop-blur-md border border-slate-800/50 rounded-2xl shadow-xl py-2 z-50 overflow-hidden"
          >
            <div className="px-3 py-2 border-b border-slate-800/50">
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">
                Account
              </p>
              <p className="text-sm text-slate-200 truncate">{user.email}</p>
            </div>

            <div className="py-1.5">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-200 hover:bg-slate-800/50 transition-colors group/item"
              >
                <Clock className="w-4 h-4 text-slate-400 group-hover/item:text-slate-200 transition-colors" />
                <span>Timer</span>
              </Link>
              <Link
                href="/dashboard"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-200 hover:bg-slate-800/50 transition-colors group/item"
              >
                <LayoutDashboard className="w-4 h-4 text-slate-400 group-hover/item:text-slate-200 transition-colors" />
                <span>Dashboard</span>
              </Link>
              <button
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-200 hover:bg-slate-800/50 transition-colors group/item disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSigningOut ? (
                  <Loader2 className="w-4 h-4 text-slate-400 animate-spin" />
                ) : (
                  <LogOut className="w-4 h-4 text-slate-400 group-hover/item:text-slate-200 transition-colors" />
                )}
                <span>{isSigningOut ? 'Signing out...' : 'Sign Out'}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
