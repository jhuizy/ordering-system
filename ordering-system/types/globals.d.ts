export {}

declare global {
  interface ClerkAuthorization {
    permission: 'org:feature:barista' | 'org:feature:drinker' | 'org:feature:admin'
    role: 'org:admin' | 'org:member'
  }
}