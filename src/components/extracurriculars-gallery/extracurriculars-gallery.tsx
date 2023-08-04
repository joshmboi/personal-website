import { MutableRefObject, useEffect } from "react";

import "./extracurriculars-gallery.scss";
import "../../assets/model/model.json";

interface ImageTimerRefProps {
  imageSwitchRef: MutableRefObject<number | null>;
  imageFadeRef: MutableRefObject<number | null>;
  galleryTimerRef: MutableRefObject<number | null>;
}

interface ExtracurricularsGalleryProps {
  refs: {
    galleryRef: MutableRefObject<HTMLElement | null>;
    galleryHeaderRef: MutableRefObject<HTMLHeadingElement | null>;
    galleryPictureRef: MutableRefObject<HTMLImageElement | null>;
    galleryWordsRef: MutableRefObject<HTMLParagraphElement | null>;
  };
  imageTimerRefs: ImageTimerRefProps;
}

export default function ExtracurricularsGallery({
  refs,
  imageTimerRefs,
}: ExtracurricularsGalleryProps) {
  function assertIsNode(event: EventTarget | null): asserts event is Node {
    if (!event || !("nodeType" in event)) {
      throw new Error(`Node expected`);
    }
  }

  const clickOutside = (
    ref: MutableRefObject<HTMLElement | null>,
    timerRefs: ImageTimerRefProps
  ) => {
    useEffect(() => {
      function handleClickOutside({ target }: MouseEvent) {
        assertIsNode(target);
        if (
          ref.current &&
          target === ref.current &&
          timerRefs.galleryTimerRef.current
        ) {
          const newRef = ref.current;
          newRef.style.display = "none";
          clearTimeout(timerRefs.galleryTimerRef.current);
          if (timerRefs.imageSwitchRef.current) {
            clearTimeout(timerRefs.imageSwitchRef.current);
          }
          if (timerRefs.imageFadeRef.current) {
            clearTimeout(timerRefs.imageFadeRef.current);
          }
        }
      }
      document.addEventListener("mousedown", event => {
        handleClickOutside(event);
      });
      return () => {
        document.removeEventListener("mousedown", event => {
          handleClickOutside(event);
        });
      };
    }, [ref]);
  };
  clickOutside(refs.galleryRef, imageTimerRefs);

  return (
    <section id="extra-gallery" ref={refs.galleryRef}>
      <div id="gallery-content">
        <div id="words-pics">
          <h1 id="extra-gallery-header" ref={refs.galleryHeaderRef}>
            Gallery
          </h1>
          <p id="gallery-words" ref={refs.galleryWordsRef} />
        </div>
        <img
          id="extra-gallery-picture"
          alt="placeholder"
          ref={refs.galleryPictureRef}
        />
      </div>
    </section>
  );
}
