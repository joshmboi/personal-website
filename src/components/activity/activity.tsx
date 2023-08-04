import { MouseEventHandler } from "react";
import "./activity.scss";

interface ActivityProps {
  activityName: string;
  activityText: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export default function Activity({
  activityName,
  activityText,
  onClick,
}: ActivityProps) {
  return (
    <li className="activity">
      <button type="button" className="activity-button" onClick={onClick}>
        <div className="activity-bg" id={activityName} />
        <h2 className="activity-text">{activityText}</h2>
      </button>
    </li>
  );
}
