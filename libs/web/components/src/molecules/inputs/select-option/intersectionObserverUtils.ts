export type IntersectionCallback = (isInViewPort: boolean) => void;

const observeElement = (
  target: HTMLElement,
  callback: IntersectionCallback
) => {
  const options: IntersectionObserverInit = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback(true);
      } else {
        callback(false);
      }
    });
  }, options);

  observer.observe(target);

  return () => observer.disconnect();
};

export default observeElement;
