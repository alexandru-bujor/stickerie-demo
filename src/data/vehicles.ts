import type { Vehicle, VehicleKey } from "../types";

/**
 * Side-view vehicles drawn in centimetres (1 SVG unit = 1 cm), front on the left.
 * Zones: [label, centerX, centerY, maxWidth, maxHeight].
 */
export const VEHICLES: Record<VehicleKey, Vehicle> = {
  hatch: {
    name: "Hatchback", length: 400, groundY: 150, wheelY: 120, wheelR: 30, wheels: [70, 330],
    body: "M4 110Q2 92 14 86L70 76Q110 70 140 48L175 28Q185 22 200 22L300 22Q330 24 350 40L384 74Q396 78 396 96L396 112Q396 120 388 120L366 120A36 36 0 0 0 294 120L106 120A36 36 0 0 0 34 120L12 120Q4 120 4 110Z",
    windows: ["M150 72L185 36Q192 31 202 31L255 31L255 72Z", "M265 31L300 31Q322 33 338 48L360 72L265 72Z"],
    doors: "M258 78V117M146 78V117", headlight: [6, 84, 22, 8], taillight: [386, 72, 10, 14],
    zones: [["Geam spate", 312, 52, 60, 30], ["Ușă șofer", 205, 96, 90, 30], ["Aripă spate", 378, 94, 26, 22], ["Prag lateral", 200, 112, 150, 10]],
  },
  sedan: {
    name: "Sedan", length: 470, groundY: 150, wheelY: 120, wheelR: 30, wheels: [80, 390],
    body: "M4 110Q2 92 14 88L80 80Q120 74 155 50L190 28Q200 22 216 22L320 22Q340 22 360 40L380 62L455 70Q466 72 466 90L466 112Q466 120 458 120L426 120A36 36 0 0 0 354 120L116 120A36 36 0 0 0 44 120L12 120Q4 120 4 110Z",
    windows: ["M160 72L195 36Q202 30 214 30L268 30L268 72Z", "M278 30L322 30Q338 31 352 44L372 66L372 72L278 72Z"],
    doors: "M272 78V117M156 78V117M376 78V112", headlight: [6, 86, 22, 8], taillight: [456, 72, 10, 12],
    zones: [["Geam spate", 325, 52, 70, 30], ["Ușă șofer", 214, 96, 95, 30], ["Portbagaj", 440, 92, 34, 20], ["Prag lateral", 235, 112, 190, 10]],
  },
  suv: {
    name: "SUV", length: 460, groundY: 172, wheelY: 138, wheelR: 34, wheels: [85, 375],
    body: "M4 128Q2 104 14 98L70 90Q100 84 125 56L150 26Q158 18 172 18L400 18Q420 18 432 34L452 80Q458 90 458 112L458 130Q458 138 450 138L418 138A42 42 0 0 0 332 138L128 138A42 42 0 0 0 42 138L12 138Q4 138 4 128Z",
    windows: ["M135 84L158 30Q162 26 172 26L258 26L258 84Z", "M268 26L370 26L370 84L268 84Z", "M380 26L404 26Q416 27 424 38L440 84L380 84Z"],
    doors: "M263 90V134M130 90V134M376 90V128", headlight: [6, 98, 22, 9], taillight: [448, 50, 10, 22],
    zones: [["Geam spate", 319, 55, 90, 40], ["Ușă șofer", 196, 110, 105, 34], ["Aripă spate", 436, 108, 30, 26], ["Prag lateral", 230, 132, 170, 10]],
  },
  brk: {
    name: "Break", length: 480, groundY: 150, wheelY: 120, wheelR: 30, wheels: [80, 400],
    body: "M4 110Q2 92 14 88L80 80Q120 74 155 50L190 28Q200 22 216 22L440 22Q456 22 462 36L474 70Q476 76 476 92L476 112Q476 120 468 120L436 120A36 36 0 0 0 364 120L116 120A36 36 0 0 0 44 120L12 120Q4 120 4 110Z",
    windows: ["M160 72L195 36Q202 30 214 30L275 30L275 72Z", "M285 30L380 30L380 72L285 72Z", "M390 30L440 30Q452 31 458 42L466 72L390 72Z"],
    doors: "M280 78V117M156 78V117M385 78V112", headlight: [6, 86, 22, 8], taillight: [466, 40, 10, 24],
    zones: [["Geam spate", 332, 52, 85, 30], ["Ușă șofer", 220, 96, 95, 30], ["Aripă spate", 452, 94, 30, 22], ["Prag lateral", 240, 112, 200, 10]],
  },
  moto: {
    name: "Motocicletă", length: 210, groundY: 120, wheelY: 88, wheelR: 32, wheels: [40, 172], moto: true,
    zones: [["Rezervor", 116, 50, 42, 18], ["Carenaj față", 70, 48, 28, 16], ["Coadă", 178, 57, 32, 10], ["Jantă", 172, 88, 30, 8]],
  },
};

export const VEHICLE_KEYS = Object.keys(VEHICLES) as VehicleKey[];
