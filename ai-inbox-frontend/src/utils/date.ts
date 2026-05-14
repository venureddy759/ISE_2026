export function formatDistanceToNow(value: string) {
  const diff = Math.round(
    (new Date().getTime() - new Date(value).getTime()) / (1000 * 60 * 60),
  );

  if (diff < 1) {
    return "Just now";
  }

  if (diff < 24) {
    return `${diff}h ago`;
  }

  return `${Math.round(diff / 24)}d ago`;
}

export function formatExactDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Unknown date";
  }

  return date.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
