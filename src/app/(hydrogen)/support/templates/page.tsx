import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import TemplatesTable from '@/app/shared/support/templates/table';
import HeaderAction from '../header-action';

const pageHeader = {
  title: 'Support Templates',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'Home',
    },
    {
      href: routes.support.dashboard,
      name: 'Support',
    },
    {
      name: 'Templates',
    },
  ],
};

export default function SupportTemplatesPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <HeaderAction title="template" />
      </PageHeader>
      <TemplatesTable />
    </>
  );
}
