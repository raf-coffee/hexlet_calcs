export function CountButton({ color = "", disabled = false }) {
  return (
    <button disabled={disabled} type="submit" className={`btn btn-primary my-3 ${color}`}>
      Расчитать
    </button>
  );
}
