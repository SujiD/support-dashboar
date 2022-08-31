import "./StaticBox.css";
const StaticBox = ({heading, content}) => {

  return (
    <div className="static-box">
        <b className="static-heading">{heading} </b>
        <div>{content}</div>
    </div>
  )
}

export default StaticBox