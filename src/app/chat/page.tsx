import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs'
import ChatBox from '../../components/ChatBox'

export default function ChatPage() {
  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        <section className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-indigo-700 mb-6">AI Chat Coach</h1>
          <ChatBox />
        </section>
      </SignedIn>
    </>
  )
} 