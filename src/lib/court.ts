import type { CourtZone, ShotRecord } from '@/types/hooptrack'

export function toSvgCoords(
  courtX: number,
  courtY: number,
  svgWidth: number,
  svgHeight: number,
): { x: number; y: number } {
  return { x: courtX * svgWidth, y: courtY * svgHeight }
}

export function classifyZone(x: number, y: number): CourtZone {
  // Paint: centre rectangle
  if (x >= 0.31 && x <= 0.69 && y <= 0.36) return 'paint'

  // Corners: narrow strips along sidelines within baseline area
  if (y <= 0.22) {
    if (x < 0.12) return 'three_left_corner'
    if (x > 0.88) return 'three_right_corner'
  }

  // Three-point arc radius ≈ 0.44 of court width from basket (x=0.5, y=0)
  const dx = x - 0.5
  const distFromBasket = Math.sqrt(dx * dx + y * y)
  const isThree = distFromBasket > 0.55

  if (isThree) {
    if (x < 0.35) return 'three_left_wing'
    if (x > 0.65) return 'three_right_wing'
    return 'three_top'
  }

  // Mid-range
  if (x < 0.4) return 'mid_range_left'
  if (x > 0.6) return 'mid_range_right'
  return 'mid_range_center'
}

export function computeFGPct(shots: ShotRecord[]): number {
  if (shots.length === 0) return 0
  const makes = shots.filter((s) => s.outcome === 'make').length
  return (makes / shots.length) * 100
}

function hexToRgb(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return [r, g, b]
}

function lerp(a: number, b: number, t: number) {
  return Math.round(a + (b - a) * t)
}

export function zoneHeatColor(fgPct: number): string {
  const red = hexToRgb('#ef4444')
  const orange = hexToRgb('#FF6B35')
  const green = hexToRgb('#22c55e')

  let r: number, g: number, b: number
  if (fgPct <= 50) {
    const t = fgPct / 50
    r = lerp(red[0], orange[0], t)
    g = lerp(red[1], orange[1], t)
    b = lerp(red[2], orange[2], t)
  } else {
    const t = (fgPct - 50) / 50
    r = lerp(orange[0], green[0], t)
    g = lerp(orange[1], green[1], t)
    b = lerp(orange[2], green[2], t)
  }
  return `rgb(${r},${g},${b})`
}

export const ZONE_POLYGONS: Record<CourtZone, [number, number][]> = {
  paint: [
    [0.31, 0], [0.69, 0], [0.69, 0.36], [0.31, 0.36],
  ],
  mid_range_left: [
    [0.12, 0.22], [0.31, 0.22], [0.31, 0.58], [0.12, 0.58],
  ],
  mid_range_center: [
    [0.31, 0.36], [0.69, 0.36], [0.69, 0.58], [0.31, 0.58],
  ],
  mid_range_right: [
    [0.69, 0.22], [0.88, 0.22], [0.88, 0.58], [0.69, 0.58],
  ],
  three_left_corner: [
    [0, 0], [0.12, 0], [0.12, 0.22], [0, 0.22],
  ],
  three_right_corner: [
    [0.88, 0], [1, 0], [1, 0.22], [0.88, 0.22],
  ],
  three_left_wing: [
    [0, 0.22], [0.12, 0.22], [0.35, 0.58], [0, 0.75],
  ],
  three_right_wing: [
    [0.88, 0.22], [1, 0.22], [1, 0.75], [0.65, 0.58],
  ],
  three_top: [
    [0.35, 0.58], [0.65, 0.58], [0.72, 1], [0.28, 1],
  ],
}
