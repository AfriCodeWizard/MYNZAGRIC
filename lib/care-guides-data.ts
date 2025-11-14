export interface CareGuide {
  id: string
  name: string
  icon: string
  soilType: string
  watering: string
  climate: string
  fertilization: string
  maturity: string
}

export const careGuidesData: CareGuide[] = [
  {
    id: "1",
    name: "Grafted Hass Avocado",
    icon: "🥑",
    soilType: "Well-drained loamy soil with good organic matter. pH 6.0-7.0",
    watering: "Moderate watering. 2-3 times weekly during dry seasons. Ensure good drainage.",
    climate: "Altitude: 1000–2000m. Prefers cool, subtropical climate. Moderate rainfall (1000-1500mm)",
    fertilization: "Apply NPK (10:10:10) every 3 months. Add compost annually.",
    maturity: "Starts fruiting at 3-4 years. Full production by 6-7 years.",
  },
  {
    id: "2",
    name: "Tommy Mango",
    icon: "🥭",
    soilType: "Well-drained, sandy loam soil. Can tolerate slight acidity.",
    watering: "Water regularly during establishment. Reduce during flowering (triggers fruiting).",
    climate: "Altitude: 0-1500m. Warm climate (25-30°C). Needs dry season for flowering.",
    fertilization: "Apply NPK (8:8:8) twice yearly. Rich in potassium during fruiting.",
    maturity: "Starts fruiting at 3-5 years. Commercial production by 7-8 years.",
  },
  {
    id: "3",
    name: "Strawberry",
    icon: "🍓",
    soilType: "Loose, well-drained soil rich in organic matter. pH 5.5-7.0",
    watering: "Frequent watering (daily in dry season). Drip irrigation recommended.",
    climate: "Cool climate (15-25°C). Altitude: 1500-2500m. Needs some frost for flowering.",
    fertilization: "Light NPK (5:10:10) monthly. Avoid excess nitrogen.",
    maturity: "Flowers within 4-6 weeks. First harvest at 4-5 months.",
  },
  {
    id: "4",
    name: "Grafted Apple",
    icon: "🍎",
    soilType: "Well-drained loam, slightly acidic. pH 6.0-7.0. Good depth (60cm+)",
    watering: "Moderate, consistent watering. 2-3 times weekly.",
    climate: "Cool climate. Altitude: 1800-2500m. Requires chill hours (winter cold).",
    fertilization: "NPK (10:10:20) annually. Add calcium and magnesium.",
    maturity: "Flowers in spring. First fruit at 2-3 years. Full production by 5-7 years.",
  },
  {
    id: "5",
    name: "Dragon Fruit",
    icon: "🐉",
    soilType: "Sandy, well-drained soil. Low fertility tolerance.",
    watering: "Minimal watering once established. Drought resistant. Water during growth phase.",
    climate: "Warm (20-30°C). Altitude: 0-1200m. Tolerates hot, dry conditions.",
    fertilization: "Light feeding. Apply NPK (6:30:30) during flowering.",
    maturity: "Flowers at 1-2 years. First fruit within 3 years.",
  },
  {
    id: "6",
    name: "Grafted Pixies Orange",
    icon: "🍊",
    soilType: "Well-drained, deep loam. pH 6.0-8.0. Avoid waterlogging.",
    watering: "Regular watering (2-3 times weekly). Critical during flowering and fruit development.",
    climate: "Altitude: 0-1500m. Warm climate (20-28°C). Tolerates dry spells.",
    fertilization: "NPK (10:10:10) quarterly. Zinc foliar spray for deficiency.",
    maturity: "Flowers in 1-2 years. Full production by 4-5 years.",
  },
]
