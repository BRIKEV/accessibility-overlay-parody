import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { AccessibilityWidget } from "./accessibility-widget"
import { AlertTriangle, MousePointer, Keyboard, Settings } from "lucide-react"
import { useNavigate } from "react-router"

export function FrustrationForm() {
  const navigate = useNavigate()
  const [showWidget, setShowWidget] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
  })
  const [attemptedDirectInput, setAttemptedDirectInput] = useState(false)
  const [shakeForm, setShakeForm] = useState(false)
  const [cursorPosition, setCursorPosition] = useState(() => {
    // Initialize cursor position in the center of the viewport
    if (typeof window !== 'undefined') {
      return {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
      }
    }
    return { x: 200, y: 200 }
  }) // Added cursor position state to manage virtual cursor from parent
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    // Show widget after a brief delay
    const timer = setTimeout(() => setShowWidget(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleDirectInput = () => {
    setAttemptedDirectInput(true)
    setShakeForm(true)
    setTimeout(() => setShakeForm(false), 500)
  }

  const handleWidgetInput = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleCursorMove = (newPosition: { x: number; y: number }) => {
    setCursorPosition(newPosition)
  }

  const handleTypingState = (typing: boolean) => {
    setIsTyping(typing)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    if (formData.name) {
      setTimeout(() => {
        navigate('/problem-with-overlay');
      }, 1000)
    }
  }

  const isFormComplete = !!formData.name

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-4xl font-bold text-foreground">Contact Us</h1>
            <p className="text-lg text-muted-foreground">
            Experience our "revolutionary" accessible contact form! Don't worry about using your keyboard or mouse like you normally would - we've disabled those for your own good.
            </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Form Section */}
          <div className="space-y-6">
            <Card className={`${shakeForm ? "shake" : ""} ${attemptedDirectInput ? "pulse-warning" : ""}`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MousePointer className="h-5 w-5" />
                  Get Started
                </CardTitle>
                <CardDescription>Please fill out your name</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="my-4">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      autoComplete="off"
                      value={formData.name}
                      onChange={(e) => handleDirectInput()}
                      onFocus={handleDirectInput}
                      onClick={handleDirectInput}
                      placeholder="Enter your full name"
                      className="cursor-not-allowed"
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={!isFormComplete}>
                    Send Message
                  </Button>
                </form>

                {attemptedDirectInput && (
                  <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <div className="flex items-center gap-2 text-destructive">
                      <AlertTriangle className="h-4 w-4" />
                      <p className="text-sm font-medium">
                        Oh no! We've detected you trying to use this form like you normally would. Please use our amazing widget instead - we know what's best for you!
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card className="bg-secondary border-secondary">
              <CardContent>
                <div className="flex items-start gap-3">
                  <Keyboard className="h-5 w-5 text-white" />
                  <div>
                    <h3 className="font-semibold text-secondary-foreground mb-2">Mandatory Instructions (Because You Need Them):</h3>
                    <ul className="text-sm text-secondary-foreground space-y-1">
                      <li>• Your keyboard and mouse don't work here (we fixed that for you!)</li>
                      <li>• You MUST use our special widget - no exceptions</li>
                      <li>• Follow our slow, cumbersome virtual controls</li>
                      <li>• Trust us, this is definitely better than normal web forms</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:sticky lg:top-4">
            {showWidget ? (
              <AccessibilityWidget
                formData={formData}
                onInputChange={handleWidgetInput}
                onSubmit={handleSubmit}
                isFormComplete={isFormComplete}
                cursorPosition={cursorPosition}
                onCursorMove={handleCursorMove}
                onTypingState={handleTypingState}
              />
            ) : (
              <Card className="bg-muted/50 border-dashed border-2">
                <CardContent className="pt-6 text-center">
                  <div className="animate-pulse">
                    <Settings className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-muted-foreground">Loading your mandatory accessibility solution...</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Desktop layout: Side by side */}
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Form Section */}
            <div className="space-y-6">
              <Card className={`${shakeForm ? "shake" : ""} ${attemptedDirectInput ? "pulse-warning" : ""}`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MousePointer className="h-5 w-5" />
                    Get Started
                  </CardTitle>
                  <CardDescription>Please fill out your name</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit}>
                    <div className="my-4">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleDirectInput()}
                        onFocus={handleDirectInput}
                        onClick={handleDirectInput}
                        placeholder="Enter your full name"
                        className="cursor-not-allowed"
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={!isFormComplete}>
                      {loading ? "Sending..." : "Send Message"}
                    </Button>
                  </form>

                  {attemptedDirectInput && (
                    <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                      <div className="flex items-center gap-2 text-destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <p className="text-sm font-medium">
                          Oh no! We've detected you trying to use this form like you normally would. Please use our amazing widget instead - we know what's best for you!
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Instructions */}
              <Card className="bg-secondary border-secondary">
                <CardContent>
                  <div className="flex items-start gap-3">
                    <Keyboard className="h-5 w-5 text-white" />
                    <div>
                      <h3 className="font-semibold text-secondary-foreground mb-2">Mandatory Instructions (Because You Need Them):</h3>
                      <ul className="text-sm text-secondary-foreground space-y-1">
                        <li>• Your keyboard and mouse don't work here (we fixed that for you!)</li>
                        <li>• You MUST use our special widget - no exceptions</li>
                        <li>• Follow our slow, cumbersome virtual controls</li>
                        <li>• Trust us, this is definitely better than normal web forms</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Widget Section - Desktop only (hidden on mobile) */}
            <div className="hidden md:block lg:sticky lg:top-4">
              {showWidget ? (
                <AccessibilityWidget
                  formData={formData}
                  onInputChange={handleWidgetInput}
                  onSubmit={handleSubmit}
                  isFormComplete={isFormComplete}
                  cursorPosition={cursorPosition}
                  onCursorMove={handleCursorMove}
                  onTypingState={handleTypingState}
                />
              ) : (
                <Card className="bg-muted/50 border-dashed border-2">
                  <CardContent className="pt-6 text-center">
                    <div className="animate-pulse">
                      <Settings className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-muted-foreground">Loading your mandatory accessibility solution...</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
      {showWidget && (
        <div
          className="virtual-cursor"
          style={{
            left: cursorPosition.x - (window.pageXOffset || document.documentElement.scrollLeft),
            top: cursorPosition.y - (window.pageYOffset || document.documentElement.scrollTop),
            transform: `translate(-50%, -50%) ${isTyping ? "scale(1.2)" : "scale(1)"}`,
          }}
        />
      )}
    </div>
  )
}
