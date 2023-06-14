export const CountButton = ({ color, disabled }) => {
  return (
    <button disabled={disabled} type="submit" className={`btn btn-primary my-3 ${color}`}>
      Расчитать
    </button>
  );
};
