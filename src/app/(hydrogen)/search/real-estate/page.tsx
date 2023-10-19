import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import ProductsGrid from '@/app/shared/explore-listing';
import ListingFilters from '@/app/shared/explore-listing/listing-filters';

const pageHeader = {
  title: 'Search & Filters',
  breadcrumb: [
    {
      name: 'Pages',
    },
    {
      href: routes.search.realEstate,
      name: 'Search & Filters',
    },
    {
      name: 'Real Estate',
    },
  ],
};

export default function RealEstatePage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <ListingFilters className="mb-6" />
      <ProductsGrid />
    </>
  );
}
