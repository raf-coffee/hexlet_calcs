export function CountButton({ color = "", disabled = false }) {
  return (
    <button disabled={disabled} type="submit" className={`btn btn-primary my-md-4  ${color}`}>
      Расчитать
    </button>
  );
}
