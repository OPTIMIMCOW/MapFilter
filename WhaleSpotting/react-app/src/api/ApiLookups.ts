import { Species, OrcaType, AttractionType } from "./ApiEnums";

export const WhaleImageDictionary = {
    [Species.AtlanticWhiteSidedDolphin]: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Atlantic_white-sided_dolphin.jpg",
    [Species.CaliforniaSeaLion]: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/California_sea_lion_in_La_Jolla_%2870568%29.jpg/1280px-California_sea_lion_in_La_Jolla_%2870568%29.jpg",
    [Species.DallsPorpoise]: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Phocoenoides_dalli_%28Dall%27s_porpoise%29.jpg/1920px-Phocoenoides_dalli_%28Dall%27s_porpoise%29.jpg",
    [Species.GrayWhale]: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Ballena_gris_adulta_con_su_ballenato.jpg/1920px-Ballena_gris_adulta_con_su_ballenato.jpg",
    [Species.HarborPorpoise]: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Ecomare_-_bruinvis_Michael_in_2015_%28bruinvis-michael2015-9313-sw%29.jpg/1920px-Ecomare_-_bruinvis_Michael_in_2015_%28bruinvis-michael2015-9313-sw%29.jpg",
    [Species.HarborSeal]: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Common_seal_%28Phoca_vitulina%29_2.jpg/1920px-Common_seal_%28Phoca_vitulina%29_2.jpg",
    [Species.Humpback]: "https://upload.wikimedia.org/wikipedia/commons/6/61/Humpback_Whale_underwater_shot.jpg",
    [Species.Minke]: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Minke_Whale_%28NOAA%29.jpg",
    [Species.NorthernElephantSeal]: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Mating_scene_with_elevated_Alpha_Male._Elephant_Seals_of_Piedras_Blancas.jpg/1280px-Mating_scene_with_elevated_Alpha_Male._Elephant_Seals_of_Piedras_Blancas.jpg",
    [Species.Orca]: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Killerwhales_jumping.jpg/1920px-Killerwhales_jumping.jpg",
    [Species.Other]: "whaleicon512.png",
    [Species.PacificWhiteSidedDolphin]: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Pacific_white-sided_dolphins_%28Lagenorhynchus_obliquidens%29_NOAA.jpg",
    [Species.SeaOtter]: "https://upload.wikimedia.org/wikipedia/commons/0/02/Sea_Otter_%28Enhydra_lutris%29_%2825169790524%29_crop.jpg",
    [Species.SouthernElephantSeal]: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Mirounga_leonina_male.JPG/1920px-Mirounga_leonina_male.JPG",
    [Species.StellerSeaLion]: "https://upload.wikimedia.org/wikipedia/commons/7/74/Sivuchi.jpg",
    [Species.Unknown]: "whaleicon512.png",
};

export const WhaleVisualTextDictionary = {
    [Species.AtlanticWhiteSidedDolphin]: "Atlantic White Sided Dolphin",
    [Species.CaliforniaSeaLion]: "California Sea Lion",
    [Species.DallsPorpoise]: "Dalls Porpoise",
    [Species.GrayWhale]: "Gray Whale",
    [Species.HarborPorpoise]: "Harbor Porpoise",
    [Species.HarborSeal]: "Harbor Seal",
    [Species.Humpback]: "Humpback Whale",
    [Species.Minke]: "Minke Whale",
    [Species.NorthernElephantSeal]: "Northern Elephant Seal",
    [Species.Orca]: "Orca",
    [Species.Other]: "Other Whale",
    [Species.PacificWhiteSidedDolphin]: "Pacific White Sided Dolphin",
    [Species.SeaOtter]: "Sea Otter",
    [Species.SouthernElephantSeal]: "Southern Elephant Seal",
    [Species.StellerSeaLion]: "Steller Sea Lion",
    [Species.Unknown]: "Unknown type",
};

export const OrcaTypeTextDictionary = {
    [OrcaType.NorthernResident]: "Northern Resident",
    [OrcaType.Offshore]: "Offshore",
    [OrcaType.SouthernResident]: "Southern Resident",
    [OrcaType.Transient]: "Transient",
};

export const markerColour =
{
    [AttractionType.Beach]: "#0000FF",
    [AttractionType.Hiking]: "#FF2500",
    [AttractionType.History]: "#A500FF",
    [AttractionType.Fishing]: "#005AFF",
};