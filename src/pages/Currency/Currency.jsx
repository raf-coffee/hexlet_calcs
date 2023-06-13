import { Image } from "react-bootstrap";
import underConstruction from "../../assets/images/under-construction.webp";

export const Currency = () => {
  return (
    <div>
      <div className={"container text-start"}>
        <div className={"row mb-4"}>
          <div className={"col"}>
            <h3>Конвертер валют</h3>
          </div>
          <div className={"col"}>
            <h3>Результат</h3>
          </div>
        </div>
      </div>
      <div>
        <h3>Описание конвертера</h3>
        <Image src={underConstruction} className={"img-fluid mx-auto d-block"} />
      </div>
    </div>
  );
};
