export function CountButton({ color = "", disabled = false }) {
  return (
    <button disabled={disabled} type="submit" className={`btn btn-primary mt-md-2 mb-md-4  ${color}`}>
      Расчитать
    </button>
  );
}
