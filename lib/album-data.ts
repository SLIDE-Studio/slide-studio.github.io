// Seasonal lab photo album.
//
// HOW TO ADD PHOTOS:
//  1. Upload the image to the project (e.g. /public/images/album/spring-2026/lab-outing.jpg).
//  2. Add an entry to the matching season's `photos` array below:
//       { src: "/images/album/spring-2026/lab-outing.jpg", alt: "Lab outing at the park", caption: "Spring lab outing" }
//  3. To start a NEW season, add a new object to the TOP of `albums` (newest first).
//
// `caption` is optional. `alt` should always describe the photo for accessibility.

export type AlbumPhoto = {
  src: string
  alt: string
  caption?: string
}

export type SeasonAlbum = {
  /** Unique id used as the section anchor, e.g. "spring-2026" */
  id: string
  /** Season label, e.g. "Spring", "Summer", "Fall", "Winter" */
  season: "Spring" | "Summer" | "Fall" | "Winter"
  /** Year of the season */
  year: number
  /** Optional short blurb describing the season */
  description?: string
  photos: AlbumPhoto[]
}

// Newest seasons at the TOP — they appear first.
export const albums: SeasonAlbum[] = [
  {
    id: "spring-2026",
    season: "Spring",
    year: 2026,
    description: "Fresh starts, new projects, and warmer days in the studio.",
    photos: [
      // Add photos here, e.g.:
      // { src: "/images/album/spring-2026/kickoff.jpg", alt: "Team kickoff meeting", caption: "Semester kickoff" },
    ],
  },
]
