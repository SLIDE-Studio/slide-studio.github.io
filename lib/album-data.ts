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
    id: "fall-2026",
    season: "Fall",
    year: 2026,
    description: "Together for a new fall term in the studio.",
    photos: [
      {
        src: "/images/album/fall-2026/IMG_3276.JPG",
        alt: "SLIDE Studio members gathered on outdoor steps beside a brick building, trees, and roses in Fall 2026",
        caption: "Fall term lab group photo",
      },
      {
        src: "/images/album/fall-2026/tmp1.jpg",
        alt: "Portrait-oriented photo of SLIDE Studio members standing together on steps beneath a tree in Fall 2026",
        caption: "Fall term lab photo on the steps",
      },
    ],
  },
  {
    id: "spring-2026",
    season: "Spring",
    year: 2026,
    description: "Fresh starts, new projects, and warmer days in the studio.",
    photos: [
      {
        src: "/images/album/spring-2026/26SS.jpg",
        alt: "Six SLIDE Studio lab members posing with peace signs outdoors in front of greenery and roses",
        caption: "Spring term lab photo",
      },
    ],
  },
  {
    id: "winter-2026",
    season: "Winter",
    year: 2026,
    description: "Bundled up and busy — winter term in the studio.",
    photos: [
      {
        src: "/images/album/winter-2026/2526FW.jpg",
        alt: "Five SLIDE Studio lab members standing in front of the Algoma University building",
        caption: "Winter term lab photo",
      },
    ],
  },
]
