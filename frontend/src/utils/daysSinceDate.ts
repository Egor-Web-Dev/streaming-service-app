export function daysSinceDate(dateString: string): string {
  const inputDate = new Date(dateString);
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - inputDate.getTime();

  return Math.floor(timeDifference / (1000 * 60 * 60 * 24)).toString();
}
