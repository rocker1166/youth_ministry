"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Alert } from "@/components/ui/alert"
import { Lock, User, AlertCircle, Shield, KeyRound, Info } from "lucide-react"
import Image from "next/image"

export default function AdminLogin() {
  const router = useRouter()
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      })

      if (response.ok) {
        router.push("/admin")
        router.refresh()
      } else {
        const data = await response.json()
        setError(data.error || "Invalid credentials")
      }
    } catch (err) {
      setError("Login failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-primary via-primary-600 to-primary-800 relative overflow-hidden">
        {/* Decorative Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-12 lg:px-16 xl:px-20 text-white">
          {/* Logo and Title */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center border-2 border-white/30">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Admin Portal</h1>
                <p className="text-white/90 text-xs">Institute of Youth Affairs</p>
              </div>
            </div>
            <div className="h-1 w-20 bg-white/40 rounded-full" />
          </div>

          {/* Welcome Message */}
          <div className="space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold leading-tight">
              Welcome to the
              <br />
              <span className="text-white/90">Administrative Dashboard</span>
            </h2>
            <p className="text-base text-white/80 leading-relaxed max-w-md">
              Secure access to manage events, news, gallery, and user data.
            </p>
          </div>

          {/* Features */}
          <div className="mt-8 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-sm">Secure Authentication</p>
                <p className="text-xs text-white/70">Protected by encryption</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <KeyRound className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-sm">Role-Based Access</p>
                <p className="text-xs text-white/70">Authorized personnel only</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-auto pt-8">
            <p className="text-xs text-white/60">
              Ministry of Youth Affairs & Sports
              <br />
              Government of India
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-neutral-50">
        <div className="w-full max-w-md">
          {/* Mobile Header */}
          <div className="lg:hidden text-center mb-6">
            <div className="w-14 h-14 bg-primary rounded-lg flex items-center justify-center mx-auto mb-3">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-xl font-bold text-neutral-900">Admin Portal</h1>
            <p className="text-neutral-600 text-xs">Institute of Youth Affairs</p>
          </div>

          <Card className="p-6 shadow-xl border-neutral-200">
            {/* Form Header */}
            <div className="mb-5">
              <h2 className="text-xl font-bold text-neutral-900 mb-1">Sign In</h2>
              <p className="text-neutral-600 text-xs">Enter your credentials to access the dashboard</p>
            </div>

            {error && (
              <Alert variant="destructive" className="mb-4 py-2">
                <AlertCircle className="h-4 w-4" />
                <span className="ml-2 text-sm">{error}</span>
              </Alert>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1.5 text-neutral-700">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <Input
                    type="text"
                    placeholder="Enter your username"
                    value={credentials.username}
                    onChange={(e) =>
                      setCredentials({ ...credentials, username: e.target.value })
                    }
                    className="pl-9 h-10 text-sm border-neutral-300 focus:border-primary focus:ring-primary"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1.5 text-neutral-700">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    value={credentials.password}
                    onChange={(e) =>
                      setCredentials({ ...credentials, password: e.target.value })
                    }
                    className="pl-9 h-10 text-sm border-neutral-300 focus:border-primary focus:ring-primary"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-10 bg-primary hover:bg-primary-600 text-sm font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Signing In...
                  </span>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

    

            {/* Footer Warning */}
            <div className="mt-4 pt-4 border-t border-neutral-200">
              <p className="text-xs text-neutral-500 text-center leading-relaxed">
                Restricted area. Unauthorized access prohibited.
                <br />
                <span className="font-semibold text-neutral-600">Protected by Security Protocols</span>
              </p>
            </div>
          </Card>

          {/* Additional Info */}
          <p className="text-center text-xs text-neutral-500 mt-4">
            For support, contact IT administration
          </p>
        </div>
      </div>
    </div>
  )
}
