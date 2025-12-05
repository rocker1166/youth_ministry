// Utility function to shuffle an array using Fisher-Yates algorithm
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Generate gallery image paths
export function getGalleryImages(): string[] {
  const imageCount = 28 // Total images in the galary folder
  return Array.from({ length: imageCount }, (_, i) => `/galary/${i + 1}.jpeg`)
}
