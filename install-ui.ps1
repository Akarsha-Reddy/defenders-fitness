Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

Write-Host "Installing shadcn/ui components..."
npx shadcn@latest add accordion alert badge button card checkbox dialog dropdown-menu form input label select separator sheet switch tabs toast tooltip -y

Write-Host "Initializing Magic UI..."
npx magicui-cli@latest init -y

Write-Host "Installing Magic UI components..."
npx magicui-cli@latest add animated-beam shimmer-button bento-grid text-reveal border-beam animated-list number-ticker particles ripple confetti -y

Write-Host "Installing 21st.dev components..."
npx shadcn@latest add "https://21st.dev/r/animated-counter" -y
npx shadcn@latest add "https://21st.dev/r/image-comparison-slider" -y
npx shadcn@latest add "https://21st.dev/r/masonry-grid" -y
npx shadcn@latest add "https://21st.dev/r/pricing-cards-toggle" -y
npx shadcn@latest add "https://21st.dev/r/scroll-progress-bar" -y
npx shadcn@latest add "https://21st.dev/r/testimonial-3d-carousel" -y

Write-Host "All automated installs complete."
