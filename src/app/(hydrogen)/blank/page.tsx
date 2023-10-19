import PageHeader from '@/app/shared/page-header';

const pageHeader = {
  title: 'Blank page',
  breadcrumb: [
    {
      href: '/',
      name: 'Home',
    },
    {
      name: 'Blank',
    },
  ],
};

export default function BlankPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
    </>
  );
}
