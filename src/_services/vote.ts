import { api } from "../_network/api"

export type CurrentVote = {
  id: string;
  user_id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export type VoteSummary = {
  winner: string|null;
  count: number;
  list: {
    name: string;
    count: number;
    percentage: number;
  }[]
}

export const getCurrentVote = (): Promise<{ currentVote: CurrentVote|null }> => {
  return api({
    url: 'vote/current',
    method: 'GET',
  })
}

export const getOptions = (): Promise<{ list: string[] }> => {
  return api({
    url: 'vote/options',
    method: 'GET',
  })
}

export const vote = (payload: { name: string }): Promise<{ id: string }> => {
  return api({
    url: '/vote',
    method: 'POST',
    body: payload,
  })
}

export const getVoteSummary = (): Promise<VoteSummary> => {
  return api({
    url: 'admin/summary',
    method: 'GET',
  })
}