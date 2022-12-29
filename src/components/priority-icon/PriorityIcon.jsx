import "./PriorityIcon.css";

const PriorityIcon = ({color}) => {
  return (
    <div
      className="priority-container me-2"
      style={{ backgroundColor: `${color}`, borderColor: `${color}` }}
    ></div>
  );
};

export default PriorityIcon;
