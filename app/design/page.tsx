import DesignCarousel from "./DesignCarousel"
import Link from "next/link"

export default function DesignPage() {
  // Add/remove filenames here whenever you upload new images to /public/design
  const images = [
    "/design/design1.jpg",
    "/design/design2.jpg",
    "/design/design3.jpg",
    "/design/design4.jpg",
    "/design/design5.jpg",
    "/design/design6.jpg",
    "/design/design7.jpg",
    "/design/design8.jpg",
    "/design/design12.jpg",
    "/design/design13.jpg",
    "/design/design10.jpg",
    "/design/design11.jpg",
  ]

  return (
    <main style={{ padding: 24 }}>

      {/* Back button */}
      <Link href="/" style={{ display: "inline-block", marginBottom: 20 }}>
        ← Back to Home
      </Link>

      <DesignCarousel images={images} />

    </main>
  )
}