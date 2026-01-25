import {useRef} from "react";
import {imageChecker} from "../utils/cover.ts";

type MiniatyrbildProps = {
  gameName: string
}

export const Miniatyrbild = ({gameName}: MiniatyrbildProps) => {
  const retriedRef = useRef(false);


  return (
    <img
      alt={gameName + " Cover"}
      src={imageChecker(gameName)}
      onError={(e) => {
        const img = e.currentTarget;
        const cover: string = imageChecker(gameName)

        // First failure: retry once with a cache-buster
        if (!retriedRef.current && cover.length > 0) {
          retriedRef.current = true;
          const sep = cover.includes("?") ? "&" : "?";
          img.src = `${cover}${sep}v=${Date.now()}`;
          return;
        }

        e.currentTarget.src = "https://cdn2.steamgriddb.com/grid/39c2966989c4f0091a99eef7f1d09c09.png"
      }}
    />
  );

}