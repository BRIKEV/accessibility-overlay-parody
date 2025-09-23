import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Users,
  Code,
  Shield,
  ExternalLink,
  Lightbulb,
  Target,
  Heart,
} from "lucide-react"

export default function EducationalContent() {
  const realSolutions = [
    {
      icon: Code,
      title: "Semantic HTML",
      description:
        "Use proper HTML elements like <button>, <nav>, <main>, and <section> that screen readers understand natively.",
    },
    {
      icon: Target,
      title: "WCAG Guidelines",
      description:
        "Follow Web Content Accessibility Guidelines for color contrast, keyboard navigation, and alternative text.",
    },
    {
      icon: Users,
      title: "User Testing",
      description: "Test with real users who have disabilities, not just automated tools or assumptions.",
    },
    {
      icon: Shield,
      title: "Built-in Accessibility",
      description: "Design and develop with accessibility from the start, not as an afterthought or band-aid solution.",
    },
  ]

  const overlayProblems = [
    "Block existing assistive technologies",
    "Create additional barriers for users",
    "Provide false sense of compliance",
    "Often break keyboard navigation",
    "Interfere with screen reader functionality",
    "Slow down user interactions significantly",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
            <CheckCircle className="h-4 w-4" />
            Congratulations! You experienced the frustration.
          </div>

          <h1 className="text-5xl font-bold text-foreground text-balance">That Was Painful, Right?</h1>

          <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto">
            {
              "You just experienced what millions of users face when websites force accessibility overlay widgets instead of building proper accessibility from the ground up."
            }
          </p>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-16 px-4 bg-card">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-card-foreground mb-4">The Problem with Overlay Widgets</h2>
            <p className="text-lg text-muted-foreground">
              {
                "Accessibility overlays are often marketed as quick fixes, but they create more problems than they solve."
              }
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-destructive/20 bg-destructive/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <XCircle className="h-5 w-5" />
                  What Overlays Actually Do
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {overlayProblems.map((problem, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{problem}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Heart className="h-5 w-5" />
                  What Users Actually Need
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm">
                    Users with disabilities already have assistive technologies they know and trust:
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li>• Screen readers (JAWS, NVDA, VoiceOver)</li>
                    <li>• Voice control software</li>
                    <li>• Switch navigation devices</li>
                    <li>• Custom keyboards and mice</li>
                    <li>• Browser zoom and high contrast</li>
                  </ul>
                  <p className="text-sm font-medium text-primary">
                    They need websites that work WITH their tools, not against them.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Real Solutions */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Real Accessibility Solutions</h2>
            <p className="text-lg text-muted-foreground">
              Building truly accessible websites requires thoughtful design and development practices.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {realSolutions.map((solution, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <solution.icon className="h-5 w-5 text-primary" />
                    </div>
                    {solution.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{solution.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Ready to Build Real Accessibility?</h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              {
                "Stop relying on overlay widgets. Start building websites that are accessible by design and work seamlessly with assistive technologies."
              }
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="inline-flex items-center gap-2" asChild>
              <a href="https://www.w3.org/WAI/WCAG21/quickref/" target="_blank" rel="noopener noreferrer">
                <Lightbulb className="h-4 w-4" />
                Learn WCAG Guidelines
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="inline-flex items-center gap-2 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              asChild
            >
              <a href="https://webaim.org/" target="_blank" rel="noopener noreferrer">
                WebAIM Resources
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm">
            This demonstration was created to educate about the importance of proper web accessibility. 
            <br />
            Real accessibility comes from inclusive design, not overlay widgets.
          </p>
        </div>
      </footer>
    </div>
  )
}
