import EducationItem from "../education-item/education-item";

import "./education.scss";

export default function Education() {
  return (
    <section className="page-wrap">
      <h1>Education</h1>
      <ul id="ed-time">
        <EducationItem educationId="gt" />
        <EducationItem educationId="tj" />
      </ul>
    </section>
  );
}
