import { redirect } from 'next/navigation'

type Props = {
  searchParams: Promise<{ callbackUrl?: string }>
}

export default async function SignInRedirect({ searchParams }: Props) {
  const { callbackUrl } = await searchParams
  const query = callbackUrl
    ? `?callbackUrl=${encodeURIComponent(callbackUrl)}`
    : ''
  redirect(`/auth/sign-in${query}`)
}
