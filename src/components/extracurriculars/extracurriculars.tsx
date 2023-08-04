import { useRef } from "react";
import ExtracurricularsContent from "../extracurriculars-content/extracurriculars-content";
import ExtracurricularsGallery from "../extracurriculars-gallery/extracurriculars-gallery";

export default function Extracurriculars() {
  const refs = {
    galleryRef: useRef<HTMLElement | null>(null),
    galleryHeaderRef: useRef<HTMLHeadingElement | null>(null),
    galleryPictureRef: useRef<HTMLImageElement | null>(null),
    galleryWordsRef: useRef<HTMLParagraphElement | null>(null),
  };

  const imageTimerRefs = {
    imageSwitchRef: useRef<number | null>(null),
    imageFadeRef: useRef<number | null>(null),
    galleryTimerRef: useRef<number | null>(null),
  };

  return (
    <div className="page-wrap">
      <ExtracurricularsContent refs={refs} imageTimerRefs={imageTimerRefs} />
      <ExtracurricularsGallery refs={refs} imageTimerRefs={imageTimerRefs} />
    </div>
  );
}
