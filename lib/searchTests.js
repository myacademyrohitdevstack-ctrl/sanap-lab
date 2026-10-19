export function searchTests(tests, query = "") {
  const q = (query || "").trim().toLowerCase();
  if (!q) return tests;

  const exactSynonymMatches = [];
  const nameStartsWithMatches = [];
  const nameContainsMatches = [];
  const synonymContainsMatches = [];

  for (const test of tests) {
    const testName = (test.name || "").toLowerCase();
    const synonyms = Array.isArray(test.synonyms)
      ? test.synonyms.map((s) => (s || "").toLowerCase())
      : [];

    const isExactSynonym = synonyms.some((s) => s === q) || testName === q;
    if (isExactSynonym) {
      exactSynonymMatches.push(test);
      continue;
    }

    const isNameStartsWith = testName.startsWith(q);
    if (isNameStartsWith) {
      nameStartsWithMatches.push(test);
      continue;
    }

    const isNameContains = testName.includes(q);
    if (isNameContains) {
      nameContainsMatches.push(test);
      continue;
    }

    const isSynonymContains = synonyms.some((s) => s.includes(q));
    if (isSynonymContains) {
      synonymContainsMatches.push(test);
    }
  }

  return [
    ...exactSynonymMatches,
    ...nameStartsWithMatches,
    ...nameContainsMatches,
    ...synonymContainsMatches,
  ];
}
