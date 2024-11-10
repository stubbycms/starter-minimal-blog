export function removeFrontMatter(content: string) {
  let frontMatter = content.match(/---([\s\S]*?)---/);
  if (frontMatter) {
    return content.replace(frontMatter[0], "");
  }
  return content;
}

export async function getBlogPost(slug: string) {
  const res = await fetch(
    `https://stubby.io/api/v1/sites/${process.env.STUBBY_SITE_ID}/pages/${slug}?apiKey=${process.env.STUBBY_API_KEY}`
  );

  if (res.ok && res.status < 300) {
    const data = await res.json();
    return data;
  } else {
    return [];
  }
}

export async function getBlogPosts() {
  const res = await fetch(
    `https://stubby.io/api/v1/sites/${process.env.STUBBY_SITE_ID}/folders?apiKey=${process.env.STUBBY_API_KEY}`
  );

  if (res.ok && res.status < 300) {
    const data = await res.json();
    return data;
  } else {
    return [];
  }
}

export function formatDate(date: string, includeRelative = false) {
  if (!date) return "Unknown";

  let currentDate = new Date();
  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }
  let targetDate = new Date(date);

  let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  let monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  let daysAgo = currentDate.getDate() - targetDate.getDate();

  let formattedDate = "";

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`;
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`;
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`;
  } else {
    formattedDate = "Today";
  }

  let fullDate = targetDate.toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (!includeRelative) {
    return fullDate;
  }

  return `${fullDate} (${formattedDate})`;
}
