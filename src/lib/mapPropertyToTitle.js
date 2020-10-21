const map = {
  geological_layout: "Geology",
  wave_exposure: "Wave Exposure",
  tidal_range: "Tidal Range",
  flora_fauna: "Vegetation",
  sediment: "Sediment Balance",
  storm_climate: "Cyclones (storm climate)",
  slope: "Slope",
  coastenv: "Coastal Environment",
  erosion: "Erosion Hazard",

  gar_distance: "Distance to measurement point",
  population: "Population",
  capital_stock: "Capital stock at closest GAR point",
  roads: "Key roads within 100m of the coast",

  code: "Code",
  riskindication: "Capital stock",
  breakwaters: "Breakwaters",
  groynes: "Groynes",
  jetties: "Jetties",
  revetments: "Revetments",
  seawalls: "Sea walls",
  dikes: "Dikes",
  stormsurgebarriers: "Storm surge barriers",
  beachnourishment: "Beach nourishment",
  duneconstab: "Dune construction & stabilization",
  cliffstab: "Cliff stabilization",
  wetlandrest: "Wetland restoration",
  floodwarning: "Flood warning",
  floodproofing: "Flood proofing",
  coastalzoning: "Coastal zoning",
  groundwatermgmt: "Groundwater management",
  fluvsedmgmt: "Fluvial sediment mgm",
};

export default function mapPropertyToTitle(key) {
  return map[key] || key
}
