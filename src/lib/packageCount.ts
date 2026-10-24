import type {
  DiagnosticTest,
  HealthPackage
} from "@/types/catalogue";

/**
 * Calculates total unique parameter count for a package by inspecting
 * the parameter IDs of every included test, plus any derived parameters.
 * Eliminates manual parameter count discrepancies permanently across all surfaces.
 */
export function calculatePackageParameterCount(
  pkg: HealthPackage,
  testsById: Record<string, DiagnosticTest>
): number {
  const parameters = new Set<string>();

  for (const testId of pkg.includedTestIds) {
    const test = testsById[testId];

    if (!test) {
      throw new Error(
        `Package ${pkg.id} contains unknown test ${testId}`
      );
    }

    for (const parameterId of test.parameterIds) {
      parameters.add(parameterId);
    }
  }

  for (const derived of pkg.derivedParameterIds ?? []) {
    parameters.add(derived);
  }

  return parameters.size;
}

/**
 * Validates a collection of packages against the master tests dictionary.
 * Fails build if tests are missing, prices are zero/inverted, or parameter counts are invalid.
 */
export function validatePackages(
  packages: HealthPackage[],
  tests: Record<string, DiagnosticTest>
) {
  for (const pkg of packages) {
    if (!pkg.includedTestIds.length) {
      throw new Error(`${pkg.id}: no included tests`);
    }

    if (pkg.sellingPrice <= 0 || pkg.mrp <= 0) {
      throw new Error(`${pkg.id}: invalid price`);
    }

    if (pkg.sellingPrice > pkg.mrp) {
      throw new Error(`${pkg.id}: sale price exceeds MRP`);
    }

    for (const id of pkg.includedTestIds) {
      if (!tests[id]) {
        throw new Error(`${pkg.id}: unknown test ${id}`);
      }
    }

    const count = calculatePackageParameterCount(pkg, tests);

    if (count <= 0) {
      throw new Error(`${pkg.id}: invalid parameter count`);
    }
  }
}
