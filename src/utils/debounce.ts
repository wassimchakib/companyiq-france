export function debounce<F extends (...args: any[]) => void>(fn: F, ms: number) {
  let timer: ReturnType<typeof setTimeout>;
  const debounced = (...args: Parameters<F>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
  debounced.cancel = () => {
    clearTimeout(timer);
  };
  return debounced;
}
