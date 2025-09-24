import type React from "react"

import { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import {
  Settings,
  Keyboard,
  MousePointer,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
} from "lucide-react"

interface AccessibilityWidgetProps {
  formData: { name: string; }
  onInputChange: (field: string, value: string) => void
  onSubmit: (e: React.FormEvent) => void
  isFormComplete: boolean
  cursorPosition?: { x: number; y: number }
  onCursorMove?: (position: { x: number; y: number }) => void
  onTypingState?: (typing: boolean) => void
}

export function AccessibilityWidget({
  formData,
  onInputChange,
  onSubmit,
  isFormComplete,
  cursorPosition: externalCursorPosition,
  onCursorMove,
  onTypingState,
}: AccessibilityWidgetProps) {
  const [internalCursorPosition, setInternalCursorPosition] = useState(() => {
    // Initialize cursor position in the center of the viewport
    if (typeof window !== 'undefined') {
      return {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
      }
    }
    return { x: 200, y: 200 }
  })
  const [activeField, setActiveField] = useState<string | null>(null)
  const [showKeyboard, setShowKeyboard] = useState(false)
  const [isTyping, setIsTyping] = useState(false)

  const currentCursorPosition = externalCursorPosition || internalCursorPosition

  const moveCursor = (direction: string) => {
    const newPosition = { ...currentCursorPosition }
    const step = 20
    
    // Get current scroll position
    const scrollX = window.pageXOffset || document.documentElement.scrollLeft
    const scrollY = window.pageYOffset || document.documentElement.scrollTop
    
    // Calculate document bounds (including scroll)
    const maxX = Math.max(document.documentElement.scrollWidth, window.innerWidth) - 20
    const maxY = Math.max(document.documentElement.scrollHeight, window.innerHeight) - 20
    
    switch (direction) {
      case "up":
        newPosition.y = Math.max(scrollY, newPosition.y - step)
        break
      case "down":
        newPosition.y = Math.min(maxY, newPosition.y + step)
        break
      case "left":
        newPosition.x = Math.max(scrollX, newPosition.x - step)
        break
      case "right":
        newPosition.x = Math.min(maxX, newPosition.x + step)
        break
    }

    setInternalCursorPosition(newPosition)
    onCursorMove?.(newPosition)
  }

  const simulateClick = () => {
    // Convert document coordinates to viewport coordinates
    const scrollX = window.pageXOffset || document.documentElement.scrollLeft
    const scrollY = window.pageYOffset || document.documentElement.scrollTop
    
    const viewportX = currentCursorPosition.x - scrollX
    const viewportY = currentCursorPosition.y - scrollY
    
    // If cursor is outside viewport, scroll to make it visible
    if (viewportX < 0 || viewportX > window.innerWidth || 
        viewportY < 0 || viewportY > window.innerHeight) {
      window.scrollTo({
        left: currentCursorPosition.x - window.innerWidth / 2,
        top: currentCursorPosition.y - window.innerHeight / 2,
        behavior: 'smooth'
      })
      // Wait for scroll to complete before trying to click
      setTimeout(() => {
        simulateClick()
      }, 500)
      return
    }
    
    const element = document.elementFromPoint(viewportX, viewportY)
    console.log(element)
    if (element) {
      const input = element.closest("input, textarea")
      console.log(input);
      if (input) {
        const field = input.getAttribute("id")
        if (field) {
          setActiveField(field)
          setShowKeyboard(true)
          console.log("[v0] Clicked on field:", field)
          // Scroll input into view for better mobile experience
          input.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      } else if (element.closest('button[type="submit"]')) {
        if (isFormComplete) {
          onSubmit(new Event("submit") as any)
        }
      }
    }
  }

  const typeCharacter = (char: string) => {
    if (activeField) {
      setIsTyping(true)
      onTypingState?.(true)
      setTimeout(() => {
        const currentValue = formData[activeField as keyof typeof formData] || ""
        if (char === "BACKSPACE") {
          onInputChange(activeField, currentValue.slice(0, -1))
        } else if (char === "SPACE") {
          onInputChange(activeField, currentValue + " ")
        } else {
          onInputChange(activeField, currentValue + char)
        }
        setIsTyping(false)
        onTypingState?.(false)
      }, 200)
    }
  }

  const keyboardRows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"],
    ["SPACE", "BACKSPACE"],
  ]

  return (
    <>

      {/* Widget Panel */}
      <Card className="widget-panel w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-white flex items-center justify-center gap-2">
            <Settings className="h-5 w-5" />
            {"AccessiWidget Pro™"}
          </CardTitle>
          <p className="text-white/80 text-sm">{"Making the web accessible for everyone!"}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Virtual Mouse */}
          <div className="space-y-3">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <MousePointer className="h-4 w-4" />
              {"Virtual Mouse"}
            </h3>
            <div className="grid grid-cols-3 gap-2">
              <div></div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => moveCursor("up")}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
              <div></div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => moveCursor("left")}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={simulateClick}
                className="bg-accent text-accent-foreground hover:bg-accent/80"
              >
                {"CLICK"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => moveCursor("right")}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
              <div></div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => moveCursor("down")}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <ArrowDown className="h-4 w-4" />
              </Button>
              <div></div>
            </div>
          </div>

          {/* Virtual Keyboard Toggle */}
          <div className="space-y-3">
            <Button
              onClick={() => setShowKeyboard(!showKeyboard)}
              className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/80"
            >
              <Keyboard className="h-4 w-4 mr-2" />
              {showKeyboard ? "Hide Keyboard" : "Show Virtual Keyboard"}
            </Button>

            {showKeyboard && (
              <div className="space-y-2">
                <p className="text-white/80 text-xs text-center">
                  {activeField ? `Typing in: ${activeField}` : "Click on a field first"}
                </p>
                {keyboardRows.map((row, rowIndex) => (
                  <div key={rowIndex} className="flex gap-0.5 md:gap-1 justify-center">
                    {row.map((key) => (
                      <Button
                        key={key}
                        variant="outline"
                        size="sm"
                        onClick={() => typeCharacter(key)}
                        disabled={!activeField}
                        className={`
                          text-xs min-w-[28px] h-7 md:min-w-[32px] md:h-8
                          ${key === "SPACE" ? "flex-1" : ""}
                          ${key === "BACKSPACE" ? "min-w-[50px] md:min-w-[60px]" : ""}
                          bg-white/10 border-white/20 text-white hover:bg-white/20
                          disabled:opacity-50
                        `}
                      >
                        {key === "SPACE" ? "___" : key === "BACKSPACE" ? "⌫" : key}
                      </Button>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Status */}
          <div className="text-center">
            <p className="text-white/60 text-xs">{"Move cursor → Click field → Type with virtual keyboard"}</p>
            {isFormComplete && (
              <p className="text-accent text-sm font-semibold mt-2">{"Form complete! Click submit button."}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  )
}
