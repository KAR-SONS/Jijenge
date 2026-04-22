import { ArrowRight, Sparkles } from 'lucide-react'
import { href, useNavigate } from 'react-router-dom'

export default function Hero() {
  const navigate = useNavigate()
  const handleButton = () => {
    navigate('/tasks')
  }
  const handleWhatsapp = () => {
  window.open('https://whatsapp.com/channel/0029VbCrFtBKWEKrkrZ2OL3l', '_blank')
}


  return (
    <div className="min-h-screen bg-[#0f1419] pt-5 pb-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#06b6d4]/30 bg-[#06b6d4]/10">
                <Sparkles className="w-4 h-4 text-[#06b6d4]" />
                <span className="text-sm text-[#06b6d4] font-medium">Welcome to Jijenge</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance">
                <span className="text-[#e5e7eb]">Earn Points.</span>
                <br />
                <span className="bg-gradient-to-r from-[#06b6d4] to-cyan-400 bg-clip-text text-transparent">
                  Get Rewards.
                </span>
              </h1>
              <p className="text-xl text-[#9ca3af] text-balance leading-relaxed">
                Complete simple tasks, earn points instantly, and withdraw your earnings anytime. Watch videos, follow brands, download apps—it&apos;s that easy.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                size="lg"
                className="inline-flex items-center justify-center gap-2 h-10 rounded-md px-6 bg-[#06b6d4] text-[#0f1419] hover:bg-cyan-500 gap-2 w-full sm:w-auto"
                onClick={handleButton}
              >
                Start Earning Now <ArrowRight className="w-4 h-4" />
              </button>

              <button
                size="lg"
                className="inline-flex items-center justify-center gap-2 h-10 rounded-md px-6 bg-green-600 text-[#0f1419] hover:bg-cyan-500 gap-2 w-full sm:w-auto"
                onClick={handleWhatsapp}
              >
                Join Whatsapp Channel <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-8 border-t border-[#2d3748]">
              <div>
                <p className="text-2xl font-bold text-[#06b6d4]">20K+</p>
                <p className="text-sm text-[#9ca3af]">Active Users</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#06b6d4]">300k+</p>
                <p className="text-sm text-[#9ca3af]">Earned & Paid</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#06b6d4]">100+</p>
                <p className="text-sm text-[#9ca3af]">Tasks Available Daily</p>
              </div>
            </div>
          </div>

          <div className="relative h-96 md:h-full">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#06b6d4]/20 to-transparent rounded-3xl blur-3xl" />
            <div className="relative space-y-4 p-8">
              <div className="space-y-3">
                 <div className="p-4 rounded-xl bg-[#1a1f2e] border border-[#2d3748]/50 hover:border-[#06b6d4]/50 transition-colors cursor-pointer">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-[#06b6d4]/20 flex items-center justify-center">
                        <span className="text-[#06b6d4] font-bold text-sm">✓</span>
                      </div>
                      <span className="text-[#06b6d4] text-lg font-bold">How it Works</span>
                    </div>
                    <ul className="space-y-6 mb-8 text-white font-semibold">
                    <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[oklch(0.68_0.138_270.6)]/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <div className="w-2 h-2 rounded-full bg-[oklch(0.68_0.138_270.6)]"></div>
                    </div>
                    <span>Signup and verify your account</span>
                    </li>
                     <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[oklch(0.68_0.138_270.6)]/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <div className="w-2 h-2 rounded-full bg-[oklch(0.68_0.138_270.6)]"></div>
                    </div>
                    <span>Complete simple tasks to earn points</span>
                    </li>
                    <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[oklch(0.68_0.138_270.6)]/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <div className="w-2 h-2 rounded-full bg-[oklch(0.68_0.138_270.6)]"></div>
                    </div>
                    <span>Redeem your points for rewards</span>
                    </li>
                    <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[oklch(0.68_0.138_270.6)]/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <div className="w-2 h-2 rounded-full bg-[oklch(0.68_0.138_270.6)]"></div>
                    </div>
                    <span>Points are redeemable at a minimum of 500</span>
                    </li>
                    </ul>
                  </div>
              </div>
              </div>
              </div>

      </div>
      </div>
    </div>
  )
}
