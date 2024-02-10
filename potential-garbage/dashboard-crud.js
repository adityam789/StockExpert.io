export async function getTempData() {
  const response = await fetch("/api/dashboard/temp", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status === 401) {
    return { error: "Unauthorized" };
  }
  if (response.status === 500) {
    return { error: "Server Error" };
  }
  if (response.status === 404) {
    return { error: "Not Found" };
  } else {
    return await response.json();
  }
}