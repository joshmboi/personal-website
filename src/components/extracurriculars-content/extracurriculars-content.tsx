import { MutableRefObject } from "react";
import Activity from "../activity/activity";
import "./extracurriculars-content.scss";

interface ImageTimerRefProps {
  imageSwitchRef: MutableRefObject<number | null>;
  imageFadeRef: MutableRefObject<number | null>;
  galleryTimerRef: MutableRefObject<number | null>;
}

interface ExtracurricularsContentProps {
  refs: {
    galleryRef: MutableRefObject<HTMLElement | null>;
    galleryHeaderRef: MutableRefObject<HTMLHeadingElement | null>;
    galleryPictureRef: MutableRefObject<HTMLImageElement | null>;
    galleryWordsRef: MutableRefObject<HTMLParagraphElement | null>;
  };
  imageTimerRefs: ImageTimerRefProps;
}

interface ImageMap {
  [key: string]: string;
}

export default function ExtracurricularsContent({
  refs,
  imageTimerRefs,
}: ExtracurricularsContentProps) {
  const generateImageMap = (r: __WebpackModuleApi.RequireContext) => {
    const keys = r.keys();
    const values = keys.map(r);
    const imageMap: ImageMap = keys.reduce(
      (accumulator, key, index) => ({
        ...accumulator,
        [key]: values[index],
      }),
      {}
    );
    return imageMap;
  };
  const imageMap = generateImageMap(
    require.context("../../assets/images", true, /\.jpg$/i)
  );

  const yjspWords =
    `In the YJSP, I had the opportunity to work on building the first collegiate liquid-fueled rocket that would reach space. As a member of the Propulsion Flight Feedsystem team, I worked on the design and arrangement of the feedsystem in the flight vehicle.`;
  const projectWords =
    `I have been coding for 11 years. Though my current college degree is in Aerospace Engineering, I am a strong programmer and have never stopped coding personal projects and have been learning increasingly more. I have created an email reader that automatically condenses all of my unread emails into a single html file and a 5-layer CNN that determines if an image contains a hotdog.`;
  const gtwebWords =
    `Over the Fall of 2021, I worked with two members to create a website for users to analyze their Spotify statistics. We added the authentication of users using OAuth2 and Angular.\n\nDuring the Fall Semester of 2022, I worked with two members to create a Google Chrome Extension that mimics Apple's Shareplay using websockets and Firebase for authentication.`;
  const placeholderWords =
    `These words serve as a placeholder until I finish up this section!`;

  const galleryScroll = (
    imgMap: ImageMap,
    gallery: HTMLElement,
    picture: HTMLImageElement,
    indexNumber: number,
    starterFile: string,
    timerRefs: ImageTimerRefProps
  ) => {
    const newPicture = picture;
    newPicture.classList.add("fade");
    const newTimerRefs = timerRefs;
    newTimerRefs.imageSwitchRef.current = window.setTimeout(() => {
      newPicture.src = imgMap[`${starterFile}${(indexNumber % 3) + 1}.jpg`];
    }, 1500);
    newTimerRefs.imageFadeRef.current = window.setTimeout(() => {
      newPicture.classList.remove("fade");
    }, 1500);
    if (gallery.style.display !== "none") {
      newTimerRefs.galleryTimerRef.current = window.setTimeout(
        galleryScroll,
        5000,
        imgMap,
        gallery,
        newPicture,
        indexNumber + 1,
        starterFile,
        timerRefs
      );
    }
  };

  const activityClick = (activityName: string) => {
    const gallery = refs.galleryRef.current;
    const header = refs.galleryHeaderRef.current;
    const picture = refs.galleryPictureRef.current;
    const words = refs.galleryWordsRef.current;
    const newImageTimerRefs = imageTimerRefs;
    let headerTitle = "";
    let wordsText = "";
    let starterFile = "";
    if (gallery && header && picture && words) {
      if (activityName === "yjsp") {
        headerTitle = "YJSP";
        wordsText = yjspWords;
        starterFile = "./yjsp/yjsp";
      }
      if (activityName === "proj") {
        headerTitle = "PROJECTS";
        wordsText = projectWords;
        starterFile = "./proj/proj";
      }
      if (activityName === "gtweb") {
        headerTitle = "GT-WEBDEV";
        wordsText = gtwebWords;
        starterFile = "./gtweb/gtweb";
      }
      if (
        activityName !== "yjsp" &&
        activityName !== "proj" &&
        activityName !== "gtweb"
      ) {
        headerTitle = "PLACEHOLDER";
        wordsText = placeholderWords;
        starterFile = "./placeholder/placeholder";
      } else {
        header.innerHTML = headerTitle;
        words.innerText = wordsText;
        const pictureSrc = imageMap[`${starterFile}1.jpg`];
        picture.src = pictureSrc;
        newImageTimerRefs.galleryTimerRef.current = window.setTimeout(
          galleryScroll,
          5000,
          imageMap,
          gallery,
          picture,
          1,
          starterFile,
          newImageTimerRefs
        );
        gallery.style.display = "block";
      }
    }
  };

  return (
    <section id="extra-content">
      <h1>Extracurriculars</h1>
      <ul id="activities">
        <Activity
          activityName="yjsp"
          activityText="Yellow Jacket Space Program"
          onClick={() => activityClick("yjsp")}
        />
        <Activity
          activityName="proj"
          activityText="Personal Projects"
          onClick={() => activityClick("proj")}
        />
        <Activity
          activityName="gtweb"
          activityText="GT Web Development"
          onClick={() => activityClick("gtweb")}
        />
      </ul>
    </section>
  );
}
