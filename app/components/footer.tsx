import { Code, ExternalLink } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-8 px-4 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            This demonstration was created to educate about the importance of proper web accessibility. 
            <br />
            Real accessibility comes from inclusive design, not overlay widgets.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
            <span className="text-muted-foreground">
              Developed by <a href="https://www.linkedin.com/in/kevinjmartinez/" target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline inline-flex items-center gap-1">Kevin Martinez <span className="sr-only"> (opens in new tab)</span> <ExternalLink className="h-3 w-3" /></a>, Software Architect at{" "}
              <a 
                href="https://orbitant.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-medium text-primary hover:underline inline-flex items-center gap-1"
              >
                Orbitant
                <span className="sr-only"> (opens in new tab)</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </span>
            
            <div className="flex items-center gap-1">
              <span className="text-muted-foreground">•</span>
              <a 
                href="https://github.com/BRIKEV/accessibility-overlay-parody" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="View source code on GitHub"
              >
                <Code className="h-4 w-4" />
                <span>Source Code</span>
                <span className="sr-only"> (opens in new tab)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
