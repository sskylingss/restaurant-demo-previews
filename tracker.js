(() => {
  const ENDPOINT = "https://script.google.com/macros/s/AKfycbwHpXxlt7qWNNNV3bmjolko93rB9FdKlSW-yWPNuwPOdHQH6RYrOZ49hrD1QmDzPAHvWg/exec";
  const TOKEN_RE = /^[A-Za-z0-9_-]{16,64}$/;
  const token = new URL(location.href).searchParams.get("r");

  if (!TOKEN_RE.test(token || "")) return;
  if (!/^https:\/\/script\.google\.com\//.test(ENDPOINT)) return;

  const key = `demo-open:${token}`;
  let timer = null;

  const eligible = () => (
    document.visibilityState === "visible"
    && document.hasFocus()
    && !sessionStorage.getItem(key)
  );

  const cancel = () => {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
  };

  const send = () => {
    timer = null;
    if (!eligible()) return;

    sessionStorage.setItem(key, "1");
    const device = innerWidth <= 600
      ? "mobile"
      : innerWidth <= 1024
        ? "tablet"
        : "desktop";
    const query = new URLSearchParams({
      token,
      event: "engaged_open",
      path: location.pathname,
      device,
    });

    fetch(`${ENDPOINT}?${query}`, {
      mode: "no-cors",
      keepalive: true,
    }).catch(() => {
      sessionStorage.removeItem(key);
    });
  };

  const arm = () => {
    cancel();
    if (eligible()) timer = setTimeout(send, 2000);
  };

  document.addEventListener("visibilitychange", arm);
  window.addEventListener("focus", arm);
  window.addEventListener("blur", cancel);
  arm();
})();
