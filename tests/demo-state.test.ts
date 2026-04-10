import test from "node:test";
import assert from "node:assert/strict";

import {
  addDemoComment,
  buildSeedState,
  completeDemoOnboarding,
  createDemoPost,
  loginDemo,
  sendDemoMessage,
  signupDemo,
  toggleDemoCommunityMembership,
  updateDemoProfile
} from "@/lib/demo/state";

test("loginDemo sets the demo session user", () => {
  const state = buildSeedState();
  const result = loginDemo(state, "aylin@friendaway.app");
  assert.equal(result.error, undefined);
  assert.equal(result.state.sessionUserId !== null, true);
});

test("signupDemo adds a new local profile", () => {
  const state = buildSeedState();
  const result = signupDemo(state, {
    name: "New User",
    email: "new@example.com",
    current_city: "Berlin",
    country_origin: "Spain",
    arrival_date: "2026-03-12",
    user_type: "other",
    bio: "Hello"
  });

  assert.equal(result.error, undefined);
  assert.equal(result.state.profiles.some((profile) => profile.email === "new@example.com"), true);
});

test("createDemoPost adds a post for the logged-in user", () => {
  const loggedIn = loginDemo(buildSeedState(), "aylin@friendaway.app").state;
  const result = createDemoPost(loggedIn, "Test post");
  assert.equal(result.error, undefined);
  assert.equal(result.state.posts[0].content, "Test post");
});

test("addDemoComment increments post comment count", () => {
  const loggedIn = loginDemo(buildSeedState(), "aylin@friendaway.app").state;
  const targetPost = loggedIn.posts[0];
  const before = targetPost.comments_count ?? 0;
  const result = addDemoComment(loggedIn, targetPost.id, "Helpful reply");
  const updated = result.state.posts.find((post) => post.id === targetPost.id);

  assert.equal(result.error, undefined);
  assert.equal(updated?.comments_count, before + 1);
});

test("toggleDemoCommunityMembership flips joined state", () => {
  const state = buildSeedState();
  const target = state.communities[0];
  const updated = toggleDemoCommunityMembership(state, target.id);
  const next = updated.communities.find((community) => community.id === target.id);

  assert.equal(next?.is_joined, !target.is_joined);
});

test("sendDemoMessage appends a message", () => {
  const loggedIn = loginDemo(buildSeedState(), "aylin@friendaway.app").state;
  const result = sendDemoMessage(loggedIn, "user-2", "Hello there");

  assert.equal(result.error, undefined);
  assert.equal(result.state.messages.at(-1)?.content, "Hello there");
});

test("completeDemoOnboarding marks the user as onboarded", () => {
  const signedUp = signupDemo(buildSeedState(), {
    name: "New User",
    email: "new2@example.com",
    current_city: "Berlin",
    country_origin: "Italy",
    arrival_date: "2026-03-12",
    user_type: "worker",
    bio: "Hi"
  }).state;

  const updated = completeDemoOnboarding(signedUp, {
    name: "New User",
    current_city: "Berlin",
    country_origin: "Italy",
    arrival_date: "2026-03-12",
    user_type: "worker",
    bio: "Finished onboarding",
    avatar_url: "https://example.com/avatar.png"
  });

  const current = updated.profiles.find((profile) => profile.id === updated.sessionUserId);
  assert.equal(current?.onboarding_completed, true);
});

test("updateDemoProfile propagates city changes into authored posts", () => {
  let state = loginDemo(buildSeedState(), "aylin@friendaway.app").state;
  state = createDemoPost(state, "Moving my profile city").state;
  const updated = updateDemoProfile(state, {
    name: "Aylin Demir",
    current_city: "Hamburg",
    country_origin: "Turkey",
    arrival_date: "2026-03-14",
    user_type: "expat",
    bio: "Updated city",
    avatar_url: "https://example.com/avatar.png"
  });

  const authoredPost = updated.posts.find((post) => post.user_id === updated.sessionUserId);
  assert.equal(authoredPost?.city, "Hamburg");
});
