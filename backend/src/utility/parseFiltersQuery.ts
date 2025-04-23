export const  buildMeiliSearchFilters = (filterQuery: string | undefined): string[] => {
  if (!filterQuery) return [];

  try {
    const parsed: Record<string, (string | boolean | number)[]> = JSON.parse(filterQuery);
    const filterExpressions: string[] = [];

    for (const key in parsed) {
      const values = parsed[key];
      if (!Array.isArray(values) || values.length === 0) continue;

      // Strings need quotes, booleans/numbers don't
      const formatted = values
        .map(v => typeof v === 'string' ? `"${v.trim()}"` : v)
        .join(', ');

      if (values.length === 1) {
        filterExpressions.push(`${key} = ${formatted}`);
      } else {
        filterExpressions.push(`${key} IN [${formatted}]`);
      }
    }

    return filterExpressions;
  } catch (err) {
    console.warn("Failed to parse or build filters:", err);
    return [];
  }
}
