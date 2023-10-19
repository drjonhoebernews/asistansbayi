'use client';

import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import FileListTable from '@/app/shared/file/manager/file-list/table';
import FileGrid from '@/app/shared/file/manager/file-grid';
import PageHeader from '@/app/shared/page-header';
import { Button } from '@/components/ui/button';
import { routes } from '@/config/routes';
import FileStats from '@/app/shared/file/manager/file-stats';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { PiArrowLineDownBold } from 'react-icons/pi';
import { allFilesData } from '@/data/all-files';
const FileUpload = dynamic(() => import('@/app/shared/file-upload'), {
  ssr: false,
});

export default function FileListPage() {
  const searchParams = useSearchParams();
  const layout = searchParams.get('filelayout');
  const isGridLayout = layout?.toLowerCase() === 'grid';
  const { openModal } = useModal();

  const pageHeader = useMemo(() => {
    return {
      title: 'File Manager',
      breadcrumb: [
        {
          href: routes.eCommerce.dashboard,
          name: 'Home',
        },
        {
          href: routes.file.dashboard,
          name: 'File Manager',
        },
        {
          name: !isGridLayout ? 'List' : 'Grid',
        },
      ],
    };
  }, [isGridLayout]);

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Button
          className="mt-4 w-full @lg:mt-0 @lg:w-auto dark:bg-gray-200 dark:text-white"
          onClick={() =>
            openModal({
              view: <FileUpload />,
            })
          }
        >
          <PiArrowLineDownBold className="me-1.5 h-[17px] w-[17px]" />
          Upload
        </Button>
      </PageHeader>

      <FileStats className="mb-6 @5xl:mb-8 @7xl:mb-11" />
      {!isGridLayout ? <FileListTable data={allFilesData} /> : <FileGrid />}
    </>
  );
}
