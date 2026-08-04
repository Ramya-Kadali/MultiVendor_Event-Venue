"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/contexts/auth-context"
import { authApi } from "@/lib/api/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, AlertTriangle, ArrowLeft, Mail, RefreshCw, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface OtpVerificationFormProps {
  email: string
  role?: "USER" | "VENDOR"
  onBack?: () => void
}

export function OtpVerificationForm({ email, role = "USER", onBack }: OtpVerificationFormProps) {
  const { login } = useAuth()
  const router = useRouter()
  const [otp, setOtp] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [isVendorWaiting, setIsVendorWaiting] = useState(false)
  const [countdown, setCountdown] = useState(30)

  // Ref for the input to focus it automatically
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Focus input on mount
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  // Countdown timer for resend
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000)
    }
    return () => clearTimeout(timer)
  }, [countdown])

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      router.push(`/signup?role=${role.toLowerCase()}`)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsVendorWaiting(false)
    setIsLoading(true)

    try {
      const response = await authApi.verifyOtp({ email, otp, role })

      const message = response.message || ""
      const isSuccess = message.toLowerCase().includes("verified") || message.toLowerCase().includes("success")

      if (!isSuccess && !response.token) {
        throw new Error(message || "Verification failed")
      }

      // Check if vendor needs approval  
      if (role === "VENDOR" && message.toLowerCase().includes("awaiting")) {
        setIsVendorWaiting(true)
        return
      }

      // Auto-login for USER (and approved VENDOR)
      if (response.token) {
        try {
          await login(response)
          // Small delay for UI feedback
          setTimeout(() => {
            const dashboardPath = role === "VENDOR" ? "/vendor/dashboard" : "/user/dashboard"
            router.push(dashboardPath)
          }, 500)
        } catch (loginError) {
          console.error('[OTP] Auto-login failed:', loginError)
          setError("Login failed. Please try logging in manually.")
        }
      } else {
        setError("Verification successful, but auto-login failed. Please log in manually.")
      }
    } catch (err: any) {
      setError(err.message || "Invalid OTP. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResend = async () => {
    if (countdown > 0) return

    setError("")
    setIsResending(true)

    try {
      await authApi.resendOtp(email, role)
      setCountdown(30) // Reset countdown
    } catch (err: any) {
      setError(err.message || "Failed to resend OTP.")
    } finally {
      setIsResending(false)
    }
  }

  if (isVendorWaiting) {
    return (
      <div className="space-y-6 text-center animate-in fade-in duration-500">
        <div className="flex justify-center mb-6">
          <div className="h-20 w-20 bg-yellow-100 rounded-full flex items-center justify-center animate-pulse">
            <AlertTriangle className="h-10 w-10 text-yellow-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Application Submitted!</h2>

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-left">
          <div className="flex gap-3">
            <div className="shrink-0 mt-0.5">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
            </div>
            <p className="text-sm text-yellow-800">
              Your vendor account has been verified and is under review. Our team checks all applications within 24 hours.
            </p>
          </div>
        </div>

        <div className="text-sm text-gray-500 bg-gray-50 p-4 rounded-xl">
          <p className="font-medium mb-2">What happens next?</p>
          <ul className="space-y-2 text-left list-disc list-inside">
            <li>Admin reviews your business details</li>
            <li>You receive an approval email</li>
            <li>Login becomes active instantly</li>
          </ul>
        </div>

        <Button
          onClick={() => router.push("/login?role=vendor")}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white"
        >
          Return to Login
        </Button>
      </div>
    )
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 mb-4">
          <Mail className="h-8 w-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Check your email</h2>
        <p className="text-sm text-gray-500 mt-2 max-w-xs mx-auto">
          We've sent a 6-digit verification code to <br />
          <span className="font-medium text-gray-900 text-base">{email}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <Alert variant="destructive" className="animate-in shake">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
            <Input
              ref={inputRef}
              id="otp"
              type="text"
              placeholder="0 0 0 0 0 0"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              required
              className="relative bg-white text-center text-3xl tracking-[1em] font-mono h-16 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all shadow-sm rounded-lg text-gray-900 placeholder:text-gray-300"
            />
          </div>
          <p className="text-xs text-center text-gray-400">
            Enter the 6-digit code from your email
          </p>
        </div>

        <Button
          type="submit"
          className={cn(
            "w-full h-11 text-base font-medium transition-all duration-200 shadow-md hover:shadow-lg",
            role === 'USER' ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700" : "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
          )}
          disabled={isLoading || otp.length !== 6}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4 animate-spin" /> Verifying...
            </span>
          ) : (
            "Verify Email"
          )}
        </Button>

        <div className="text-center pt-2">
          <p className="text-sm text-gray-500 mb-3">
            Didn't receive the code?
          </p>
          <Button
            type="button"
            variant="ghost"
            onClick={handleResend}
            disabled={isResending || countdown > 0}
            className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 h-auto p-2"
          >
            {isResending ? (
              <span className="flex items-center gap-2"><RefreshCw className="h-3 w-3 animate-spin" /> Sending...</span>
            ) : countdown > 0 ? (
              <span className="text-gray-400 cursor-not-allowed">Resend in {countdown}s</span>
            ) : (
              "Click to resend"
            )}
          </Button>
        </div>
      </form>

      <div className="mt-8 pt-6 border-t border-gray-100 flex justify-center">
        <button
          type="button"
          onClick={handleBack}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Signup
        </button>
      </div>
    </div>
  )
}

