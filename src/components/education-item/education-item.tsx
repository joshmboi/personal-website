import "./education-item.scss";

interface EducationNameProps {
  educationId: string;
}

interface EducationContentProps {
  educationId: string;
}

interface EducationItemProps {
  educationId: string;
}

function EducationName({ educationId }: EducationNameProps) {
  if (educationId === "gt") {
    return <h2 className="ed-name">Georgia Institute of Technology</h2>;
  }
  if (educationId === "tj") {
    return (
      <h2 className="ed-name">
        Thomas Jefferson High School for Science and Technology
      </h2>
    );
  }
  return <h2 className="ed-name">Unknown</h2>;
}

function EducationContent({ educationId }: EducationContentProps) {
  if (educationId === "gt") {
    return (
      <ul className="ed-content">
        <li>Bachelor of Science in Aerospace Engineering</li>
        <li>Expected Graduation: May 2024</li>
        <li>GPA: 4.0/4.0; Faculty Honors all Semesters</li>
        <li>Member of Sigma Gamma Tau Aerospace Engineering Honor Society</li>
        <li>Member of the Georgia Tech Web Development Club</li>
      </ul>
    );
  }
  if (educationId === "tj") {
    return (
      <ul className="ed-content">
        <li>Graduated May 2020</li>
        <li>GPA: 4.315/4.0</li>
        <li>Member of the National Honor Society</li>
        <li>Vice President of TJ Rocketry Club</li>
      </ul>
    );
  }
  return <ul className="ed-content" />;
}

export default function EducationItem({ educationId }: EducationItemProps) {
  return (
    <li className="ed-item" id={educationId}>
      <div className="ed-bg" />
      <EducationName educationId={educationId} />
      <EducationContent educationId={educationId} />
    </li>
  );
}
