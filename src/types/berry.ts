export interface Berry {
  id: number
  name: string
  growth_time: number
  max_harvest: number
  natural_gift_power: number
  size: number
  smoothness: number
  soil_dryness: number
  url: string
}

export interface BerryListResponse {
  count: number
  next: string | null
  previous: string | null
  results: BerryResult[]
}

export interface BerryResult {
  name: string
  url: string
}

export interface BerryDetail {
  id: number
  name: string
  growth_time: number
  max_harvest: number
  natural_gift_power: number
  size: number
  smoothness: number
  soil_dryness: number
  firmness: {
    name: string
    url: string
  }
  flavors: {
    potency: number
    flavor: {
      name: string
      url: string
    }
  }[]
  item: {
    name: string
    url: string
  }
  natural_gift_type: {
    name: string
    url: string
  }
}
