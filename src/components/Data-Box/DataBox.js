import "./DataBox.css";


export const DataBox = ({heading, text, color}) => {
  return (
    <div className='data-box d-flex flex-column justify-content-evenly mt-5' style={{borderColor: color}}>
        <span className='heading '>{heading}</span>
        <span className='text-end text'>{text}</span>
    </div>
  )
}
