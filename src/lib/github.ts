import type { GithubStats } from './types'

const GRAPHQL_URL = 'https://api.github.com/graphql'

const QUERY = `
query($username: String!) {
  user(login: $username) {
    name
    login
    avatarUrl
    followers { totalCount }
    repositories(ownerAffiliations: OWNER, first: 100) {
      nodes { stargazerCount }
    }
    contributionsCollection {
      totalCommitContributions
      totalPullRequestContributions
      totalIssueContributions
      contributionCalendar { totalContributions }
    }
    repositoriesContributedTo(first: 1, contributionTypes: [COMMIT, ISSUE, PULL_REQUEST, REPOSITORY]) {
      totalCount
    }
  }
}
`

export async function fetchGithubStats(username: string, token: string): Promise<GithubStats> {
  const res = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: {
      Authorization: `bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: QUERY, variables: { username } }),
    next: { revalidate: 3600 },
  })

  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`)

  const { data, errors } = await res.json()
  if (errors) throw new Error(errors[0]?.message ?? 'GitHub GraphQL error')

  const u = data.user
  return {
    name: u.name || u.login,
    username: u.login,
    avatarUrl: u.avatarUrl,
    followers: u.followers.totalCount,
    totalStars: u.repositories.nodes.reduce((sum: number, r: { stargazerCount: number }) => sum + r.stargazerCount, 0),
    totalCommits: u.contributionsCollection.totalCommitContributions,
    totalPRs: u.contributionsCollection.totalPullRequestContributions,
    totalIssues: u.contributionsCollection.totalIssueContributions,
    contributedTo: u.repositoriesContributedTo.totalCount,
  }
}

export async function fetchAvatarAsBase64(url: string): Promise<string> {
  try {
    const res = await fetch(url)
    if (!res.ok) return ''
    const buf = await res.arrayBuffer()
    const b64 = Buffer.from(buf).toString('base64')
    const mime = res.headers.get('content-type') || 'image/png'
    return `data:${mime};base64,${b64}`
  } catch {
    return ''
  }
}
