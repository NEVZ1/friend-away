"use client";

import React from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

import {
  addDemoComment,
  buildSeedState,
  completeDemoOnboarding,
  createDemoPost,
  getCurrentDemoUser,
  loginDemo,
  logoutDemo,
  sendDemoMessage,
  signupDemo,
  toggleDemoCommunityMembership,
  updateDemoProfile,
  type DemoState,
  type ProfilePayload,
  type SignupPayload
} from "@/lib/demo/state";
import type { UserProfile } from "@/lib/types";

type DemoContextValue = {
  isReady: boolean;
  state: DemoState;
  currentUser: UserProfile | null;
  login: (email: string) => { error?: string };
  signup: (payload: SignupPayload) => { error?: string };
  logout: () => void;
  completeOnboarding: (payload: ProfilePayload) => void;
  updateProfile: (payload: ProfilePayload) => void;
  createPost: (content: string, communityId?: string | null) => { error?: string };
  addComment: (postId: string, content: string) => { error?: string };
  toggleCommunityMembership: (communityId: string) => void;
  sendMessage: (receiverId: string, content: string) => { error?: string };
  resetDemo: () => void;
};

const STORAGE_KEY = "friendaway-demo-state";

const DemoContext = createContext<DemoContextValue | null>(null);

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<DemoState>(buildSeedState);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      setState(JSON.parse(raw) as DemoState);
    }
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) {
      return;
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [isReady, state]);

  const currentUser = useMemo(
    () => getCurrentDemoUser(state),
    [state]
  );

  const value = useMemo<DemoContextValue>(
    () => ({
      isReady,
      state,
      currentUser,
      login(email) {
        const result = loginDemo(state, email);
        setState(result.state);
        return result.error ? { error: result.error } : {};
      },
      signup(payload) {
        const result = signupDemo(state, payload);
        setState(result.state);
        return result.error ? { error: result.error } : {};
      },
      logout() {
        setState((current) => logoutDemo(current));
      },
      completeOnboarding(payload) {
        setState((current) => completeDemoOnboarding(current, payload));
      },
      updateProfile(payload) {
        setState((current) => updateDemoProfile(current, payload));
      },
      createPost(content, communityId) {
        const result = createDemoPost(state, content, communityId);
        setState(result.state);
        return result.error ? { error: result.error } : {};
      },
      addComment(postId, content) {
        const result = addDemoComment(state, postId, content);
        setState(result.state);
        return result.error ? { error: result.error } : {};
      },
      toggleCommunityMembership(communityId) {
        setState((current) => toggleDemoCommunityMembership(current, communityId));
      },
      sendMessage(receiverId, content) {
        const result = sendDemoMessage(state, receiverId, content);
        setState(result.state);
        return result.error ? { error: result.error } : {};
      },
      resetDemo() {
        const nextState = buildSeedState();
        setState(nextState);
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
      }
    }),
    [currentUser, isReady, state]
  );

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo() {
  const context = useContext(DemoContext);

  if (!context) {
    throw new Error("useDemo must be used within DemoProvider");
  }

  return context;
}
