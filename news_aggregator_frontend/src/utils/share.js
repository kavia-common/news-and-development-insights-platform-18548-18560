function openWindow(url) {
  const w = 600;
  const h = 520;
  const left = (window.innerWidth - w) / 2;
  const top = (window.innerHeight - h) / 2;
  window.open(
    url,
    '_blank',
    `width=${w},height=${h},left=${left},top=${top},noopener`
  );
}

// PUBLIC_INTERFACE
export function shareArticle({ url, title }) {
  /** Use Web Share API if available; otherwise open social share links. */
  const shareData = { title: title || 'News', url };
  if (navigator.share) {
    navigator.share(shareData).catch(() => {
      // fall back to links if user cancels or share fails
      openWindow(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title || '')}&url=${encodeURIComponent(url)}`);
    });
    return;
  }
  // Fallback: open Twitter share
  openWindow(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title || '')}&url=${encodeURIComponent(url)}`);
}
