import underConstruction from "../../assets/images/under-construction.webp";
import {Image} from "react-bootstrap";

export const IdealWeight = () => {
  return (
    <div>
      <div className={"container text-start"}>
        <div className={"row mb-4"}>
          <div className={"col"}>
            <h3>Калькулятор идеального веса</h3>
          </div>
          <div className={"col"}>
            <h3>Результат</h3>
          </div>
        </div>
      </div>
      <div>
        <h3>Описание калькулятора</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus leo nulla, lobortis at sollicitudin at,
          cursus nec tortor. Vestibulum dolor eros, tempor sed enim at, tincidunt condimentum purus. Ut ut orci viverra,
          varius felis at, fringilla justo. In placerat blandit ipsum nec tempor. Suspendisse vestibulum eleifend
          ligula, non commodo risus maximus et. Integer laoreet, ipsum a ullamcorper varius, metus dui auctor ligula, id
          eleifend est turpis in metus. Donec et risus et elit suscipit convallis ac ac nunc. Vivamus mollis massa eu mi
          condimentum mattis.
        </p>
        <Image src={underConstruction} className={"img-fluid mx-auto d-block"} />
      </div>
    </div>
  )
}