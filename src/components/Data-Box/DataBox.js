import "./DataBox.css";
import { useSpring, animated, config } from "react-spring";
export const DataBox = ({heading, text, color}) => {
  const styles = useSpring({
    from:{ opacity: 0},
    to:{ opacity: 1},
    config: {delay: 10000}
  });

  return (
    <animated.div style={{styles, borderColor: color}} className="data-box mt-5">
      <div className='d-flex flex-column justify-content-evenly' >
        <span className='heading '>{heading}</span>
        <span className='text-end text'>{text}</span>
      </div>
    </animated.div>
  )
}
