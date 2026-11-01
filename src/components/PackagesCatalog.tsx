import { serverApi } from '@/lib/serverApi';
import { CANONICAL_PACKAGES } from '@/lib/packagesCatalogue';
import { isPublicPackage, toPackageItem } from '@/lib/packageMapper';
import PopularPackagesGrid from './PopularPackagesGrid';

/** The public package grid, fed by the CMS (admin → Packages). The bundled
 *  catalogue is only a safety net for when the API can't be reached. */
export default async function PackagesCatalog() {
  const live = (await serverApi.packages.list()).filter(isPublicPackage).map(toPackageItem);
  return <PopularPackagesGrid packages={live.length > 0 ? live : CANONICAL_PACKAGES} />;
}
