import {imageData} from "../data/gameCover.ts";

export const imageChecker = (name: string): string => {
  if (imageData[name] != null) {
    return imageData[name].valueOf();
  } else {
    return "https://cdn2.steamgriddb.com/grid/39c2966989c4f0091a99eef7f1d09c09.png";
  }
};

