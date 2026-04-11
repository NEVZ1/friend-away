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
  markAllNotificationsRead,
  logoutDemo,
  quickStartDemo,
  sendDemoMessage,
  signupDemo,
  toggleDemoLike,
  toggleDemoFollow,
  toggleDemoSave,
  toggleDemoCommunityMembership,
  reportDemoPost,
  updateDemoProfile,
  type DemoState,
  type ProfilePayload,
  type QuickStartPayload,
  type SignupPayload
} from "@/lib/demo/state";
import type { UserProfile } from "@/lib/types";

type DemoContextValue = {
  isReady: boolean;
  state: DemoState;
  currentUser: UserProfile | null;
  login: (email: string) => { error?: string };
  signup: (payload: SignupPayload) => { error?: string };
  quickStart: (payload: QuickStartPayload) => { error?: string };
  logout: () => void;
  completeOnboarding: (payload: ProfilePayload) => void;
  updateProfile: (payload: ProfilePayload) => void;
  createPost: (content: string, communityId?: string | null, mediaUrls?: string[]) => { error?: string };
  addComment: (postId: string, content: string) => { error?: string };
  toggleCommunityMembership: (communityId: string) => void;
  sendMessage: (receiverId: string, content: string) => { error?: string };
  toggleLikePost: (postId: string) => { error?: string };
  toggleSavePost: (postId: string) => { error?: string };
  reportPost: (postId: string) => void;
  markNotificationsRead: () => void;
  toggleFollowUser: (userId: string) => { error?: string };
  isFollowingUser: (userId: string) => boolean;
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
      const parsed = JSON.parse(raw) as Partial<DemoState>;
      const seed = buildSeedState();
      setState({
        ...seed,
        ...parsed,
        notifications: parsed.notifications ?? seed.notifications,
        follows: parsed.follows ?? seed.follows
      });
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
      quickStart(payload) {
        const result = quickStartDemo(state, payload);
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
      createPost(content, communityId, mediaUrls) {
        const result = createDemoPost(state, content, communityId, mediaUrls);
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
      toggleLikePost(postId) {
        const result = toggleDemoLike(state, postId);
        setState(result.state);
        return result.error ? { error: result.error } : {};
      },
      toggleSavePost(postId) {
        const result = toggleDemoSave(state, postId);
        setState(result.state);
        return result.error ? { error: result.error } : {};
      },
      reportPost(postId) {
        const result = reportDemoPost(state, postId);
        setState(result.state);
      },
      markNotificationsRead() {
        setState((current) => markAllNotificationsRead(current));
      },
      toggleFollowUser(userId) {
        const result = toggleDemoFollow(state, userId);
        setState(result.state);
        return result.error ? { error: result.error } : {};
      },
      isFollowingUser(userId) {
        if (!currentUser) return false;
        return state.follows.some((follow) => follow.follower_id === currentUser.id && follow.following_id === userId);
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
