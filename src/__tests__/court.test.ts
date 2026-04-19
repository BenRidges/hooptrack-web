import { describe, it, expect } from 'vitest'
import {
  toSvgCoords,
  classifyZone,
  computeFGPct,
  zoneHeatColor,
  ZONE_POLYGONS,
} from '@/lib/court'
import type { CourtZone, ShotRecord } from '@/types/hooptrack'

describe('toSvgCoords', () => {
  it('maps (0,0) to top-left of SVG', () => {
    expect(toSvgCoords(0, 0, 500, 470)).toEqual({ x: 0, y: 0 })
  })
  it('maps (1,1) to bottom-right of SVG', () => {
    expect(toSvgCoords(1, 1, 500, 470)).toEqual({ x: 500, y: 470 })
  })
  it('maps (0.5, 0.5) to centre', () => {
    expect(toSvgCoords(0.5, 0.5, 500, 470)).toEqual({ x: 250, y: 235 })
  })
})

describe('classifyZone', () => {
  it('classifies paint correctly', () => {
    expect(classifyZone(0.5, 0.1)).toBe<CourtZone>('paint')
  })
  it('classifies left corner three', () => {
    expect(classifyZone(0.05, 0.1)).toBe<CourtZone>('three_left_corner')
  })
  it('classifies right corner three', () => {
    expect(classifyZone(0.95, 0.1)).toBe<CourtZone>('three_right_corner')
  })
  it('classifies top-of-key three', () => {
    expect(classifyZone(0.5, 0.8)).toBe<CourtZone>('three_top')
  })
  it('classifies left wing three', () => {
    expect(classifyZone(0.1, 0.55)).toBe<CourtZone>('three_left_wing')
  })
  it('classifies right wing three', () => {
    expect(classifyZone(0.9, 0.55)).toBe<CourtZone>('three_right_wing')
  })
  it('classifies mid-range centre', () => {
    expect(classifyZone(0.5, 0.45)).toBe<CourtZone>('mid_range_center')
  })
  it('classifies mid-range left', () => {
    expect(classifyZone(0.2, 0.45)).toBe<CourtZone>('mid_range_left')
  })
  it('classifies mid-range right', () => {
    expect(classifyZone(0.8, 0.45)).toBe<CourtZone>('mid_range_right')
  })
})

describe('computeFGPct', () => {
  it('returns 0 for empty array', () => {
    expect(computeFGPct([])).toBe(0)
  })
  it('returns 100 for all makes', () => {
    const shots = [{ outcome: 'make' }, { outcome: 'make' }] as ShotRecord[]
    expect(computeFGPct(shots)).toBe(100)
  })
  it('returns 50 for half makes', () => {
    const shots = [{ outcome: 'make' }, { outcome: 'miss' }] as ShotRecord[]
    expect(computeFGPct(shots)).toBe(50)
  })
  it('rounds to one decimal place', () => {
    const shots = [
      { outcome: 'make' }, { outcome: 'make' }, { outcome: 'miss' },
    ] as ShotRecord[]
    expect(computeFGPct(shots)).toBeCloseTo(66.7, 1)
  })
})

describe('zoneHeatColor', () => {
  it('returns a non-empty string for any valid fgPct', () => {
    expect(zoneHeatColor(0)).toBeTruthy()
    expect(zoneHeatColor(50)).toBeTruthy()
    expect(zoneHeatColor(100)).toBeTruthy()
  })
  it('is redder at low FG%', () => {
    const low = zoneHeatColor(10)
    const high = zoneHeatColor(90)
    expect(low).not.toBe(high)
  })
})

describe('ZONE_POLYGONS', () => {
  const zones: CourtZone[] = [
    'paint', 'mid_range_left', 'mid_range_center', 'mid_range_right',
    'three_left_corner', 'three_right_corner', 'three_left_wing',
    'three_right_wing', 'three_top',
  ]
  it('defines all 9 zones', () => {
    expect(Object.keys(ZONE_POLYGONS)).toHaveLength(9)
  })
  zones.forEach((z) => {
    it(`polygon for ${z} has at least 3 points`, () => {
      expect(ZONE_POLYGONS[z].length).toBeGreaterThanOrEqual(3)
    })
    it(`all points in ${z} are in [0,1] range`, () => {
      ZONE_POLYGONS[z].forEach(([x, y]) => {
        expect(x).toBeGreaterThanOrEqual(0)
        expect(x).toBeLessThanOrEqual(1)
        expect(y).toBeGreaterThanOrEqual(0)
        expect(y).toBeLessThanOrEqual(1)
      })
    })
  })
})
