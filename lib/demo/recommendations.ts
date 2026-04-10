import type { Community, UserProfile } from "@/lib/types";
import { getArrivalCohort } from "@/lib/utils";

function userScore(viewer: UserProfile, candidate: UserProfile) {
  let score = 0;

  if (viewer.current_city === candidate.current_city) score += 5;
  if (viewer.country_origin === candidate.country_origin) score += 4;
  if (viewer.user_type === candidate.user_type) score += 3;
  if (getArrivalCohort(viewer.arrival_date) === getArrivalCohort(candidate.arrival_date)) score += 2;

  return score;
}

function communityScore(viewer: UserProfile, community: Community) {
  let score = 0;

  if (viewer.current_city === community.city) score += 5;
  if (viewer.country_origin === community.country_origin) score += 4;
  if (viewer.user_type === community.user_type) score += 3;
  if (getArrivalCohort(viewer.arrival_date) === community.cohort_label) score += 2;
  if (community.is_joined) score -= 1;

  return score;
}

export function rankPeopleLikeYou(viewer: UserProfile, profiles: UserProfile[]) {
  return profiles
    .filter((profile) => profile.id !== viewer.id)
    .map((profile) => ({ profile, score: userScore(viewer, profile) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.profile.name.localeCompare(b.profile.name))
    .map((item) => item.profile);
}

export function rankRecentArrivals(viewer: UserProfile, profiles: UserProfile[]) {
  return profiles
    .filter((profile) => profile.id !== viewer.id && profile.current_city === viewer.current_city)
    .map((profile) => ({
      profile,
      sameCohort: getArrivalCohort(profile.arrival_date) === getArrivalCohort(viewer.arrival_date),
      sameOrigin: profile.country_origin === viewer.country_origin
    }))
    .sort((a, b) => Number(b.sameCohort) - Number(a.sameCohort) || Number(b.sameOrigin) - Number(a.sameOrigin))
    .map((item) => item.profile);
}

export function rankSuggestedCommunities(viewer: UserProfile, communities: Community[]) {
  return communities
    .map((community) => ({ community, score: communityScore(viewer, community) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || (b.community.members_count ?? 0) - (a.community.members_count ?? 0))
    .map((item) => item.community);
}
